//@flow
import React from 'react'
import { connect } from 'react-redux'
import { CSSTransition } from 'react-transition-group'
import { Measure, Relative, Container, Border, Flex, Box, Dot } from 'rebass'
//
import { getQuizQuestion, getQuizQuestionsCount, getQuizQuestionIndex } from '../../reducers'
import * as actions from '../../actions'
import Screen from './Screen'

Array.prototype.flatMap = function(lambda) {
  return Array.prototype.concat.apply([], this.map(lambda));
};

function QuestionsScreen({dispatch, question, questionIndex, questionsCount}) {
  let buttons = [
    { label: 'False', fn: () => dispatch(actions.clickAnswer(false)) },
    { label: 'True', fn: () => dispatch(actions.clickAnswer(true)) }
  ]
  let q = question.question
  let content
  if (q && q.constructor && q.constructor === String) {
    content = (<div dangerouslySetInnerHTML={{ __html: q }}></div>)
  } else {
    content = (<div>{q}</div>)
  }
  let title = (    
    <CSSTransition
      in={true}
      appear={true}
      enter={true}
      exit={true}
      key={question.category}
      classNames='title'
      timeout={{ enter: 400, exit: 400 }}>
        <div>{question.category}</div>
    </CSSTransition>
  )
  let footer = [`${questionIndex+1} of ${questionsCount}`, (<br/>)]
  for (let i=0; i < questionsCount; i++) {
    let bg = i <= questionIndex ? 'black' : null
    footer.push(<Dot bg={bg}/>)
  }  
  return (        
    <Screen
      title={title}
      footer={footer}
      buttons={buttons}>
      <CSSTransition
        in={true}
        appear={true}
        enter={true}
        exit={true}
        key={questionIndex}
        classNames='question'
        timeout={{ enter: 400, exit: 400 }}>
          <Measure>{content}</Measure>              
      </CSSTransition>
    </Screen>
  )  
}

const mapStateToProps = (state) => ({
  question: getQuizQuestion(state),
  questionsCount: getQuizQuestionsCount(state),
  questionIndex: getQuizQuestionIndex(state),
})

export default connect(mapStateToProps)(QuestionsScreen)