import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import { createStore } from 'redux'
import tinySlackApp from './reducers'
import $ from 'jquery'
import App from './components/App'

const store = createStore(tinySlackApp)

$(() => {
  render(
    <Provider store={ store }>
      <App />
    </Provider>,
    $('#app').get(0)
  )
})
