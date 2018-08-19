// @flow

export type TAjaxQuestion = {
  +question: string,
  +category: string,
}

// selectively disable +(readonly) on some fields
// so flow won't complain about immer magic, ugh
export type TAppState = {
  activities: any,
  machine: {
    actions: any,
    data: any,
    events: any,
    value: any 
  },
}

export type TQuizState = {
  questions: Array<TAjaxQuestion>,
  +answers: Array<boolean>,
  +questionIndex: number,
}

export type TConfigState = {
  +artificialFetchDelay: number,
  +artificialFetchErrorRate: number,
  +useMockQuestions: boolean,
}

export type TAppProps = {
  quiz?: TQuizState,
  location: any,
};

export type TActionBase = {
  +type: string
}

export type TActionAnswerQuestion = {
  +type: string,
  +answer: boolean
}

export type TActionFetchQuestionsSuccess = {
  +type: string,
  +questions: Array<{question: string}>,
}

export type TActionFetchQuestionsFailure = {
  +type: string,
  +error: string,
}

export type TAppAction = (TActionBase | TActionAnswerQuestion | TActionFetchQuestionsSuccess | TActionFetchQuestionsFailure)

export type TButtonCommand = {
  +label: string,
  +fn: Function,
}