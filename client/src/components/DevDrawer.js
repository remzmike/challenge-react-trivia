//@flow
import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { CSSTransition } from 'react-transition-group'
import { Drawer, Container, ButtonCircle, Fixed, Slider, Flex, Box, Divider, Absolute, Border, Switch } from 'rebass'
//
import * as actions from '../actions'
//import { getUiState, getDrawerOpen, getArtificialFetchDelay, getArtificialFetchErrorRate } from '../../reducers'

const DevDrawer = function ({dispatch, state}) {
 
  // state.app
  let uiState = state.app.machine.value.ui
  let fetchState = JSON.stringify(state.app.machine.value.fetch)
  let drawerOpen = state.app.drawerOpen
  let artificialFetchDelay = state.app.artificialFetchDelay
  let artificialFetchErrorRate = state.app.artificialFetchErrorRate  
  let useMockQuestions = state.app.useMockQuestions

  return (
    <React.Fragment>
      
      <Fixed css={{right:'1rem', top:'1rem'}}>
        <ButtonCircle onClick={() =>dispatch(actions.clickDrawerOpen())}>
          ?
        </ButtonCircle>
      </Fixed>

      <CSSTransition
        in={true}
        appear={true}
        enter={true}
        exit={true}
        key={'drawer'}
        classNames='drawer'
        timeout={{ enter: 400, exit: 400 }}>      
        <Drawer open={drawerOpen} side='right' p={3} color='white' bg='black'>
          <Flex flexDirection="column">
            <Box>
            <Absolute right={0} mr={'1rem'}>
                <ButtonCircle onClick={() => dispatch(actions.clickDrawerClose())}>close</ButtonCircle><br/>
            </Absolute>
            <Divider/>
            </Box>
            <Box>
              artificialFetchDelay: {artificialFetchDelay/100*8000}ms<br/>            
              <Slider color={'blue'} label="artificial fetch delay" value={artificialFetchDelay} onChange={(proxy) => dispatch(actions.changeArtificialFetchDelay(proxy.nativeEvent.target.valueAsNumber))}/>
            </Box>
            <Box>
              artificialFetchErrorRate: {artificialFetchErrorRate}%<br/>
              <Slider color={'blue'} label="artificial fetch error rate" value={artificialFetchErrorRate} onChange={(proxy) => dispatch(actions.changeArtificialFetchErrorRate(proxy.nativeEvent.target.valueAsNumber))}/>
            </Box>
            <Box>              
              uiState: {uiState}<br/>
              fetchState: {fetchState}<br/>
            </Box>
            <Box>              
              useMockQuestions: <Switch checked={useMockQuestions} onClick={(proxy) => dispatch(actions.changeUseMockQuestions(!useMockQuestions))}/><br/>
            </Box>
            <Box>
              <ul>
                <li><a href="/api/auth/google">/api/auth/google</a></li>                
                <li><a href="/login">/login</a></li>
              </ul>
            </Box>
          </Flex>
        </Drawer>
      </CSSTransition>
    </React.Fragment>
  )
}

DevDrawer.propTypes = {
  dispatch: PropTypes.func.isRequired,
}

const mapStateToProps = (state) => ({
  state
})

export default connect(mapStateToProps)(DevDrawer)
