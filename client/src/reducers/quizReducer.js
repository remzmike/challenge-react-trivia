// @flow
import produce from 'immer'
import { loop, Cmd } from 'redux-loop'
import { createSelector } from 'reselect'
//
import * as actions from '../actions'
import * as T from '../types'

const defaultQuizState: T.TQuizState = {
  questions: [],
  answers: [],
  questionIndex: 0,
}

const quizReducer = (state: T.TQuizState = defaultQuizState, action) => {
  let commands = []

  const producedState = produce(state, draft => {
    if (action.type === actions.INIT_APP) {
      return { ...defaultQuizState }
    } else if (action.type === actions.FETCH_QUESTIONS_SUCCESS) {
      draft.questions = action.payload
    } else if (action.type === actions.CLICK_ANSWER) {
      let isQuestionsComplete = draft.questions && draft.questions.length && draft.answers.length === draft.questions.length
      console.assert(!isQuestionsComplete) // mmm.
      draft.answers.push(action.payload)
      isQuestionsComplete = draft.questions && draft.questions.length && draft.answers.length === draft.questions.length
      if (isQuestionsComplete) {
        commands.push(Cmd.action(actions.completeQuestions()))
      } else {
        draft.questionIndex++
      }
    }
  })

  return loop(producedState, Cmd.list(commands))
}

export const getQuestions = (state) => state.questions
export const getQuestionsCount = (state) => state.questions ? state.questions.length : 0
export const getAnswers = (state) => state.answers
export const getQuestionIndex = (state) => state.questionIndex
export const getQuestion = (state) => state.questions[state.questionIndex]

export const getResults = createSelector(
  [getQuestions, getAnswers],
  (questions, answers) => {
    let resultsQuestions = []
    let numberCorrect = 0
    for (var i = 0; i < questions.length; i++) {
      let question = questions[i]
      let answer = answers[i]
      let correct =
        (answer === true && question.correct_answer === 'True') ||
        (answer === false && question.correct_answer === 'False')
      if (correct) numberCorrect++
      resultsQuestions[i] = { question: question.question, correct }
    }
    return { questions: resultsQuestions, numberCorrect }  
  }
)

export default quizReducer