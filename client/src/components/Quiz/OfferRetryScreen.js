//@flow
import React from 'react'
import { connect } from 'react-redux'
//
import * as actions from '../../actions'
import { getFetchFailureError } from '../../reducers'
import Screen from './Screen'

function OfferRetryScreen({dispatch, fetchFailureError}) {
  let buttons = [
    { label: 'Retry', fn: () => dispatch(actions.clickRetry()) },
  ]
  return (
    <Screen title="Welcome to the Trivia Challenge." buttons={buttons}>
    <p>Failed to fetch questions from remote api.</p>
    <div>
      <p>[{fetchFailureError.name}]</p>
      <p>{fetchFailureError.message}</p>
    </div>
    </Screen>
  )
}

const mapStateToProps = (state) => ({fetchFailureError: getFetchFailureError(state)})

export default connect(mapStateToProps)(OfferRetryScreen)