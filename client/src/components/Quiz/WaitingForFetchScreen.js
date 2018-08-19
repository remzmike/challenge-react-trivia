//@flow
import React from 'react'
import { connect } from 'react-redux'
import { Modal, Fixed } from 'rebass'
import { CSSTransition } from 'react-transition-group'
import { BarLoader } from 'react-spinners'
//
import { getGoodProgress } from '../../reducers'
import Screen from './Screen'

function WaitingForFetchScreen({goodProgress}) {
    let buttons = [
      { label: 'False', disabled: true },
      { label: 'True', disabled: true }
    ]
    let content
    if (goodProgress) {
      content = (<div>Fetching...</div>)
    } else {
      content = (
        <Modal p='2rem' width={640}>
          <BarLoader
            width={'100%'}
            color={'#123abc'}
            loading={!goodProgress}
          />
          <div>Fetch is taking longer than expected...</div>          
        </Modal>
      )
    }
    return (
      <Screen
        title="Welcome to the Trivia Challenge."
        buttons={buttons}
      >                
        <CSSTransition
          in={!goodProgress}
          appear={true}
          enter={true}
          exit={false}
          classNames='modal'
          timeout={{appear: 8000, enter: 8000, leave: 8000, exit: 8000}}>
          <Fixed top={0} right={0} bottom={0} left={0}/>
        </CSSTransition>           
        {content}
      </Screen>
    )
  }
  
  const mapStateToProps = (state) => ({goodProgress: getGoodProgress(state)})

  export default connect(mapStateToProps)(WaitingForFetchScreen)
  