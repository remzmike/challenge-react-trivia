// @flow
import appReducer, * as MAppReducer from './appReducer'
import quizReducer, * as MQuizReducer from './quizReducer'

export function getQuizResults(store) {
  console.assert(store)
  return MQuizReducer.getResults(store.quiz)
}

export function getQuizQuestions(store) {
  console.assert(store)
  return MQuizReducer.getQuestions(store.quiz)
}

export function getQuizQuestionsCount(store) {
  console.assert(store)
  return MQuizReducer.getQuestionsCount(store.quiz)
}

export function getQuizQuestionIndex(store) {
  console.assert(store)
  return MQuizReducer.getQuestionIndex(store.quiz)
}

export function getQuizQuestion(store) {
  console.assert(store)
  return MQuizReducer.getQuestion(store.quiz)
}

export function getUiState(store) {
  console.assert(store)
  return MAppReducer.getUiState(store.app)
}

export function getGoodProgress(store) {
  console.assert(store)
  return MAppReducer.getGoodProgress(store.app)
}

export function getFetchFailureError(store) {
  console.assert(store)
  return MAppReducer.getFetchFailureError(store.app)
}

export function getDrawerOpen(store) {
  console.assert(store)
  return MAppReducer.getDrawerOpen(store.app)
}

export function getArtificialFetchDelay(store) {
  console.assert(store)
  return MAppReducer.getArtificialFetchDelay(store.app)
}

export function getArtificialFetchErrorRate(store) {
  console.assert(store)
  return MAppReducer.getArtificialFetchErrorRate(store.app)
}

export function getUseMockQuestions(store) {
  console.assert(store)
  return MAppReducer.getUseMockQuestions(store.app)
}

export {
  appReducer as app,
  quizReducer as quiz,
};