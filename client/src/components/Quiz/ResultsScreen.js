// @flow
import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
//
import {
  ResultLine,
  ResultIcon,
} from '../../styledComponents'
import { getQuizResults} from '../../reducers'
import * as actions from '../../actions'
import Screen from './Screen'

const mapStateToProps = function (state) {
  return {
    results: getQuizResults(state),
  }
}

const ResultsScreen = function ({dispatch, results}) {

  let buttons = [
    { label: 'Play Again', fn: () => { dispatch(actions.clickPlayAgain()) } }
  ]

  return (
    <Screen
      title={`You scored ${results.numberCorrect}/10`}
      buttons={buttons}
    >
      {
        results.questions.map(result => (
          <ResultLine key={result.question}>
            <ResultIcon>{result.correct ? '+' : '-'}</ResultIcon>
            <span dangerouslySetInnerHTML={{ __html: result.question }} />
          </ResultLine>)
        )
      }
    </Screen>
  )
}

ResultsScreen.propTypes = {
  dispatch: PropTypes.func.isRequired,
  results: PropTypes.object.isRequired,  
}

export default connect(mapStateToProps)(ResultsScreen)