// @flow

/*
misc notes:
https://emotion.sh/
https://devhints.io/flow

https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Flexible_Box_Layout/Typical_Use_Cases_of_Flexbox

moving away from immutable, toward flow, since they don't integrate well
  https://github.com/facebook/immutable-js/issues/1209#issuecomment-296973977
  https://flow.org/en/docs/react/redux/#toc-typing-redux-state-immutability

also, strong practical philosophy argument:
  https://medium.com/@AlexFaunt/immutablejs-worth-the-price-66391b8742d4
  iow, don't "accidentally" mutate the state

overall, i think i can solve this problem a better way if i ever need to

immutability with flow:
  https://medium.com/@gcanti/immutability-with-flow-faa050a1aef4

two promising (and popular) helper libraries for producing new state:
  https://github.com/mweststrate/immer
    https://hackernoon.com/introducing-immer-immutability-the-easy-way-9d73d8f71cb3
    i like this
  https://github.com/kolodny/immutability-helper

router of choice for now: redux-first-router

handling state machines and async api calls
  redux-thunk (minimal klonkin solution)
  redux-saga and redux-loop
    saga is the popular one, uses generators...
    loop sounds good on paper, implementation is weird
      both of these result in weird code, which weird is better
      
    im thinking loop might be better but saga catches all the flies with honey
    
    i have experience with saga-like systems from using lua coroutines as state machines
    and... to be honest... i felt like an explicit state machine is easier to deal with
    it actually seems like people who want sagas are forgetting state machines entirely
      (even tho sagas are just a state machine defined as a generator)
    i feel like a lot of the cons of loop are just because people didn't define their state machine beforehand
    
    in other words, redux-saga allows you to define your statemachine implicitly using generator syntax
    while redux-loop actually ends up looking more like an implementation of an explicit state machine
    i already know the benefits and drawbacks of these two different techniques from writing lua games 10 years ago
    and i, and many game developers, feel that explicit state machines are better than magic generators

    it's funny, i remember when people saw statemachines-as-coroutines in my lua code they said it was confusing
    and that's the same thing some people are saying about sagas

    im gonna lean heavily on redux-loop to start and see how it goes

    https://smallbusinessforum.co/elm-architecture-with-react-redux-redux-loop-645a67070b1a
    https://lorefnon.tech/2018/02/04/redux-loop-a-better-solution-for-managing-asynchronous-operations-in-redux/

https://github.com/redux-utilities/flux-standard-action

selectors:
  https://github.com/reduxjs/reselect
  https://hackernoon.com/selector-pattern-painless-redux-store-destructuring-bfc26b72b9ae

redux best practices:
  https://medium.com/@kylpo/redux-best-practices-eef55a20cc72

common misuse of bindActionCreators:
  https://github.com/reduxjs/redux/blob/master/docs/api/bindActionCreators.md
  '''
  Normally you should just call dispatch directly on your Store instance. If you use Redux with React, react-redux will provide you with the dispatch function so you can call it directly, too.
  '''
  '''
  The only use case for bindActionCreators is when you want to pass some action creators down to a component that isn't aware of Redux, and you don't want to pass dispatch or the Redux store to it.
  '''

*/

import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Provider as ReduxProvider, connect } from 'react-redux'
import { createLogger } from 'redux-logger'
import { createStore, applyMiddleware, compose } from 'redux'
import { combineReducers } from 'redux-loop' // important difference
//import { connectRoutes } from 'redux-first-router'
import createHistory from 'history/createBrowserHistory'
import { install as installReduxLoop } from 'redux-loop'
import { Provider as RebassProvider } from 'rebass'
//
import { StyledApp } from './styledComponents.js'
import Quiz from './components/Quiz'
import * as reducers from './reducers/index.js'
import * as actions from './actions/index.js'
import * as T from './types/index.js'

const history = createHistory()

const rootReducer = combineReducers({
  app: reducers.app,
  quiz: reducers.quiz,
})

const enhancer = compose(
  //router.enhancer,
  applyMiddleware(
    createLogger(),
    //router.middleware,
  ),
  installReduxLoop(),
)

const store = createStore(rootReducer, enhancer)

class AppBase extends Component<Props, State> {

  componentDidMount() {
    this.props.dispatch(actions.initApp())
  }
  
  render() {
    console.log('<AppWithoutProvider> [RENDER]', 'props', this.props)
    return (
      <RebassProvider theme={{
        fonts: {
          sans: 'Helvetica, sans-serif',
        }
      }}>
        <StyledApp>
          <Quiz />
        </StyledApp>
      </RebassProvider>
    )
  }
}

// ---

const mapStateToProps = function (state) {
  return {
  }
}

const AppWithRedux = connect(mapStateToProps)(AppBase)

function App(props) {
  console.log('<App> [RENDER]', 'props', props)
  return (
    <ReduxProvider store={store}>
      <AppWithRedux />
    </ReduxProvider>
  )
}

export default App