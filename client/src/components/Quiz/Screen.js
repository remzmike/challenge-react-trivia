// @flow
import React from 'react'
//import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import {
  Button
} from '../../styledComponents'
import {
  Flex,
  Box, Heading
} from 'rebass'
import * as types from '../../types'

export type TQuizScreenProps = {
  +title: string,
  +children: any,
  +footer?: string,
  +actions: Array<TButtonCommand>,
  +disableButtons?: boolean,
};

let buttonContainerCss = {
  'button:nth-child(1)': {
    borderBottomLeftRadius: '1rem'
  },
  'button:last-child': {
    borderBottomRightRadius: '1rem'
  }
}

const Screen = function (props: types.TScreenProps) {
  
  let { title, children, footer, buttons } = props
  return (    
    <Flex flexDirection="column" css={{height: "100vh", maxWidth: '640px', margin:'auto'}}>
      <Box css={{textAlign:'center', fontFamily:'Fjalla One'}} py={'1rem'}>
        <Heading>{title}</Heading> 
      </Box>
      <Box bg='white' flex="1" css={{display:'flex', flexDirection:'column', overflowY:'auto', borderRadius:'1rem', borderBottomLeftRadius:0, borderBottomRightRadius:0}} p={['1rem','2rem']} pb={0}>
        <Box flex="1" fontSize={[3,4]}>
          {children}
        </Box>
        <Box css={{textAlign:'center'}} p='1rem'>{footer}</Box>
      </Box>
      <Box>        
        <Flex css={buttonContainerCss}>
        {
          buttons.map((button: types.TButtonCommand) => (
            <Button css={buttonContainerCss} disabled={button.disabled} key={button.label} onClick={button.fn}>
              {button.label}
            </Button>
          ))
        }
        </Flex>
      </Box>
    </Flex>
  )
};

Screen.propTypes = {
  title: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.node
  ]).isRequired,
  buttons: PropTypes.array.isRequired,
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node
  ]),
  footer: PropTypes.string
};

export default Screen