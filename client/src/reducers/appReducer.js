// @flow

import produce from 'immer'
import { Machine } from 'xstate'
import { actions as stateActions } from 'xstate';
import { createStatefulMachine } from '@avaragado/xstateful';
import { loop, Cmd } from 'redux-loop'
//
import * as actions from '../actions'
import * as T from '../types'
import * as api from '../api'

const { send, stop } = stateActions

const defaultAppState: T.TAppState = {
  machine: {
    actions: [],
    data: {},
    events: [],
    value: {}
  },
  activities: {
    'good-progress': true // required
  },
  fetchFailureError: null,
  drawerOpen: true,
  artificialFetchDelay: 35, // [0-100] normalized
  artificialFetchErrorRate: 20, // [0-100] normalized
  useMockQuestions: true,
}

const appMachineRaw = Machine({
  key: 'appMachineRaw',
  parallel: true,
  states: {
    'ui': {
      initial: 'intro',
      states: {
        'intro': {
          onEntry: ['fetchQuestions'],
          on: {
            'CLICK_BEGIN': 'waiting-for-fetch'
          }
        },
        // i assume this is what a join looks like...
        // (and i assume parallel machines is what a fork looks like...)
        'waiting-for-fetch': {
          on: {
            '': [
              { in: 'fetch.complete.success', target: 'questions' },
              { in: 'fetch.complete.failure', target: 'offer-retry', actions: ['resetFetch'] },
            ],
          },
        },
        'offer-retry': {
          onEntry: ['fetchQuestions'],
          on: {
            'CLICK_RETRY': 'waiting-for-fetch',
          },
        },
        'questions': {
          on: {
            'COMPLETE_QUESTIONS': 'results'
          }
        },
        'results': {
          on: {
            'CLICK_PLAY_AGAIN': { 'intro': { actions: ['initApp'] } },
          }
        },
      }
    },
    'fetch': {
      initial: 'idle',
      on: {
        'RESET_FETCH': 'fetch'
      },
      states: {
        'idle': {
          on: {
            'FETCH_QUESTIONS_BEGIN': 'in-progress'
          }
        },
        'in-progress': {
          activities: ['good-progress'],
          onEntry: [
            send(stop('good-progress'), { delay: 2000 }),
          ],
          on: {
            'FETCH_QUESTIONS_SUCCESS': 'complete.success',
            'FETCH_QUESTIONS_FAILURE': 'complete.failure'
          }
        },
        'complete': {
          states: {
            'success': {},
            'failure': {},
          }
        },
      }
    }
  }
})

function doFsm(appMachine, action, state) {

  let commands = []

  // transitions
  if (action.type === actions.INIT_APP) {
    logTransitionBegin(appMachine, action)
    appMachine.init()
    logTransitionEnd(appMachine)
  } else {
    logTransitionBegin(appMachine, action)
    appMachine.transition(action.type)
    logTransitionEnd(appMachine)
  }

  // stateActions
  for (let stateAction of appMachine.state.actions) {

    let actionType;
    if (typeof stateAction === 'string') {
      actionType = stateAction
    } else {
      actionType = stateAction.type
    }

    if (actionType === 'fetchQuestions') {
      commands.push(
        Cmd.action(actions.fetchQuestionsBegin()),
        Cmd.run(api.fetchQuestions, {
          successActionCreator: actions.fetchQuestionsSuccess,
          failActionCreator: actions.fetchQuestionsFailure,
          args: [state.artificialFetchDelay, state.artificialFetchErrorRate, state.useMockQuestions]
        })        
      )
    } else if (actionType === 'resetFetch') {
      // is actions causing transitions an anti-pattern? i feel like it is...
      commands.push(
        Cmd.action(actions.resetFetch())
      )
    } else if (actionType === 'initApp') {
      commands.push(
        Cmd.action(actions.initApp())
      )
    } else if (actionType === 'xstate.send') {
      // update: manually interpret xstate.send for start/stop activities, xstateful doesn't do this

      // so i want to return a promise and use Cmd.run
      // in 2000 ms send the event, eg. {type: 'xstate.stop', activity: 'myActivity'}
      function makeSender(event, delay) {
        return () => {
          return new Promise(function (resolve) {
            setTimeout(
              () => {
                resolve({ ...event, createdBy: 'makeSender' })
              },
              delay
            )
          })
        }
      }

      console.log('\tpushing command for xstate.send', stateAction.event, stateAction.delay)
      commands.push(
        Cmd.run(
          makeSender(stateAction.event, stateAction.delay),
          {
            successActionCreator: () => {
              if (stateAction.event.type === 'xstate.start') {
                console.assert(stateAction.event.activity)
                return actions.startActivity(stateAction.event.activity)
              } else if (stateAction.event.type === 'xstate.stop') {
                console.assert(stateAction.event.activity)
                return actions.stopActivity(stateAction.event.activity)
              } else {
                console.warn('unexpected stateAction.type', stateAction)
              }
            }
          }
        )
      )
    } else {
      // action.delay .event .id
      console.warn('\tunhandled xstate action', actionType, stateAction);
    }
  }

  return commands
}

const appReducer = (state = defaultAppState, action: any) => {
  
  console.assert(state)
  console.assert(typeof state === 'object')
  console.group(`%c [quizMachineReducer called]`, 'background: #222; color: #daba55', action)

  let commands = []
  
  if (action.type === actions.INIT_APP) {
    state = { ...defaultAppState,
      artificialFetchDelay: state.artificialFetchDelay,
      artificialFetchErrorRate: state.artificialFetchErrorRate,
      useMockQuestions: state.useMockQuestions,
    }
  }
  
  console.log('%c before producer', 'border:1px solid blue')
  const producedState: T.TAppState = produce(state, draft => {
    console.assert(draft)
    console.log('producing state from ', state, 'to', draft)

    // normal redux action handling
    if (action.type === actions.START_ACTIVITY) {
      console.assert(action.activity)
      draft.activities[action.activity] = true
      // xstateful hates activities, we interpret manually
      // starting to wonder if i should use xstateful at all
    } else if (action.type === actions.STOP_ACTIVITY) {
      console.assert(action.activity)
      draft.activities[action.activity] = false
    } else if (action.type === actions.FETCH_QUESTIONS_FAILURE) {
      console.assert(action.error)
      draft.fetchFailureError = action.payload
    } else if (action.type === actions.RESET_FETCH) {
      draft.activities['good-progress'] = true // need to reset this for 2nd try, since it's true-default, gluh
    } else if (action.type === actions.CLICK_DRAWER_OPEN) {
      draft.drawerOpen = true
    } else if (action.type === actions.CLICK_DRAWER_CLOSE) {
      draft.drawerOpen = false
    } else if (action.type === actions.CHANGE_ARTIFICIAL_FETCH_DELAY) {
      draft.artificialFetchDelay = action.payload
    } else if (action.type === actions.CHANGE_ARTIFICIAL_FETCH_ERROR_RATE) {
      draft.artificialFetchErrorRate = action.payload
    } else if (action.type === actions.CHANGE_USE_MOCK_QUESTIONS) {
      draft.useMockQuestions = action.payload
    }
    
    // [FSM]
    if (appMachine.state || action.type === actions.INIT_APP) {
      let fsmCommands = doFsm(appMachine, action, state)
      console.log('> do fsm')
      for (var command of fsmCommands) {
        console.log('> push fsm command', command)
        commands.push(command)
      }
      console.assert(appMachine.state)
      console.groupEnd()

      //return appMachine.state // <- this is right | this is wrong -> draft = appMachine.state
      // well it would be right if appMachine.state was a regular object (which immer requires) (instead of an instance of xstateful's State type)
      // so instead, just modify draft proxy selectively
      draft.machine.actions = appMachine.state.actions
      draft.machine.data = appMachine.state.data
      draft.machine.events = appMachine.state.events
      draft.machine.value = appMachine.state.value
    } else {
      console.warn('skipping fsm, action', action)
    }
  })
  console.log('%c after producer', 'border:1px solid blue')

  console.groupEnd()  
  return loop(producedState, Cmd.list(commands))
}

const logState = ({ state }) => {
  console.log(`[FSM state]: ${JSON.stringify(state.value, null, 8)}\n`);
};

const logAction = ({ action }) => {
  console.log(`[FSM action]: ${JSON.stringify(action, null, 8)}\n`);
};

function logMachine(msg, machine) {
  if (machine.state && machine.state.value) {
    console.log(`${msg}`, machine.state.value, machine.state.actions, machine.state)
  } else {
    console.log(`${msg}, state.value undefined, machine =`, machine)
  }
}

function logTransitionBegin(appMachine, action) {
  console.group(`%c appMachine transition `, 'background: #add; color: white', action)
  logMachine('before', appMachine)
  console.groupCollapsed('during')
}

function logTransitionEnd(appMachine) {
  console.groupEnd()
  logMachine('after', appMachine)
  console.groupEnd()
}

const appMachine = createStatefulMachine(appMachineRaw, defaultAppState);
appMachine.on('change', logState);
appMachine.on('action', logAction);

export const getGoodProgress = (state) => state.activities['good-progress']
export const getUiState = (state) => state.machine.value.ui
export const getFetchFailureError = (state) => state.fetchFailureError
export const getDrawerOpen = (state) => state.drawerOpen
export const getArtificialFetchDelay = (state) => state.artificialFetchDelay
export const getArtificialFetchErrorRate = (state) => state.artificialFetchErrorRate
export const getUseMockQuestions = (state) => state.useMockQuestions

export default appReducer