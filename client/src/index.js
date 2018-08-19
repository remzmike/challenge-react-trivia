// @flow
import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import App from './App'
import registerServiceWorker from './registerServiceWorker'

const rootElement = document.getElementById('root')
if (rootElement) {
  ReactDOM.render(<App />, rootElement)
  registerServiceWorker()
} else {
  console.error('[fatal app error, no #root element found in document]')
}
