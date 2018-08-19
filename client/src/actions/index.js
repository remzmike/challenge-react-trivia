// @flow

// mantra: actions describe what happened

// re: redux-thunk
// async actions were originally implemented in thunks
// for various reasons i want to avoid thunks in general
//
// resolution: use redux-loop's elm-inspired side-effects
// resolution: use simple action creators with good names

// action name: <NOUN>_<VERB>
// action creator name: <verb><Noun>
// selector name: get<Noun>
//
// i dont like the difference between <NOUN>_<VERB> and <verb><Noun>
// i would rather maintain consistency with <VERB>_<NOUN> and <verb><Noun>
// the casing/spacing is already enough to differentiate between the two

export const FETCH_QUESTIONS_BEGIN = 'FETCH_QUESTIONS_BEGIN'
export const fetchQuestionsBegin = () => ({ type: FETCH_QUESTIONS_BEGIN })

export const FETCH_QUESTIONS_SUCCESS = 'FETCH_QUESTIONS_SUCCESS'
export const fetchQuestionsSuccess = (questions: Array<{}>) => ({ type: FETCH_QUESTIONS_SUCCESS, payload: questions })

export const FETCH_QUESTIONS_FAILURE = 'FETCH_QUESTIONS_FAILURE'
export const fetchQuestionsFailure = (error) => ({ type: FETCH_QUESTIONS_FAILURE, payload: error, error: true })

export const CLICK_BEGIN = 'CLICK_BEGIN'
export const clickBegin = () => ({ type: CLICK_BEGIN })

export const CLICK_PLAY_AGAIN = 'CLICK_PLAY_AGAIN'
export const clickPlayAgain = () => ({ type: CLICK_PLAY_AGAIN })

export const CLICK_RETRY = 'CLICK_RETRY'
export const clickRetry = () => ({ type: CLICK_RETRY })

export const CLICK_ANSWER = 'CLICK_ANSWER'
export const clickAnswer = (answer: boolean) => ({ type: CLICK_ANSWER, payload: answer })

export const COMPLETE_QUESTIONS = 'COMPLETE_QUESTIONS'
export const completeQuestions = () => ({ type: COMPLETE_QUESTIONS })

//

export const CLICK_DRAWER_CLOSE = 'CLICK_DRAWER_CLOSE'
export const clickDrawerClose = () => ({ type: CLICK_DRAWER_CLOSE })

export const CLICK_DRAWER_OPEN = 'CLICK_DRAWER_OPEN'
export const clickDrawerOpen = () => ({ type: CLICK_DRAWER_OPEN })

export const CHANGE_ARTIFICIAL_FETCH_DELAY = 'CHANGE_ARTIFICIAL_FETCH_DELAY'
export const changeArtificialFetchDelay = (value: number) => ({ type: CHANGE_ARTIFICIAL_FETCH_DELAY, payload: value })

export const CHANGE_ARTIFICIAL_FETCH_ERROR_RATE = 'CHANGE_ARTIFICIAL_FETCH_ERROR_RATE'
export const changeArtificialFetchErrorRate = (value: number) => ({ type: CHANGE_ARTIFICIAL_FETCH_ERROR_RATE, payload: value })

export const CHANGE_USE_MOCK_QUESTIONS = 'CHANGE_USE_MOCK_QUESTIONS'
export const changeUseMockQuestions = (value: number) => ({ type: CHANGE_USE_MOCK_QUESTIONS, payload: value })

// not sure how to name these

export const INIT_APP = 'INIT_APP'
export const initApp = () => ({ type: INIT_APP })

export const RESET_FETCH = 'RESET_FETCH'
export const resetFetch = () => ({ type: RESET_FETCH })

export const START_ACTIVITY = 'START_ACTIVITY'
export const startActivity = (activity) => ({ type: START_ACTIVITY, activity })

export const STOP_ACTIVITY = 'STOP_ACTIVITY'
export const stopActivity = (activity) => ({ type: STOP_ACTIVITY, activity })