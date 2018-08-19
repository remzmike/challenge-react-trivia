//@flow
import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { CSSTransition } from 'react-transition-group'
import { Drawer, Container, ButtonCircle, Fixed, Slider, Flex, Box, Divider, Absolute, Border } from 'rebass'
//
import * as actions from '../../actions'
import { getUiState } from '../../reducers'
import IntroScreen from './IntroScreen'
import WaitingForFetchScreen from './WaitingForFetchScreen'
import OfferRetryScreen from './OfferRetryScreen'
import QuestionsScreen from './QuestionsScreen'
import ResultsScreen from './ResultsScreen'
import DevDrawer from '../DevDrawer'

const Quiz = function ({dispatch, uiState}) {

  if (!uiState) {
    return (<div>...[{uiState}]...</div>)
  }
  
  let screen

  if (uiState === 'intro') {
    screen = (<IntroScreen />)
  } else if (uiState === 'waiting-for-fetch') {
    screen = (<WaitingForFetchScreen />)
  } else if (uiState === 'offer-retry') {
    screen = (<OfferRetryScreen />)
  } else if (uiState === 'questions') {
    screen = (<QuestionsScreen />)
  } else if (uiState === 'results') {
    screen = (<ResultsScreen />)
  }

  return (
    <Container>
      {screen}
      <DevDrawer/>
    </Container>
  )
}

Quiz.propTypes = {
  dispatch: PropTypes.func.isRequired,
  //uiState: PropTypes.,
  //goodProgress: App.getGoodProgress(),
  //fetchFailureError: App.getFetchFailureError(),
  //questions: App.getQuizQuestions(),
}

const mapStateToProps = (state) => ({
  uiState: getUiState(state)
})

export default connect(mapStateToProps)(Quiz)
