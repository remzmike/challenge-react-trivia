//@flow
import React from 'react'
import { connect } from 'react-redux'
//
import * as actions from '../../actions'
import Screen from './Screen'

const IntroScreen = function({dispatch}) {
  return (
    <Screen 
      title="Welcome to the Trivia Challenge."
      buttons={[{ label: 'BEGIN', fn: () => dispatch(actions.clickBegin()) }]}
    >
      <p>You will be presented with 10 True or False questions.</p>
      <p>Can you score 100%?</p>
    </Screen>
  )
}

export default connect()(IntroScreen)