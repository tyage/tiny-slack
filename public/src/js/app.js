import $ from 'jquery'
import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import { createStore, combineReducers, applyMiddleware } from 'redux'
import { Router, Route, IndexRoute, browserHistory } from 'react-router'
import { routerMiddleware, syncHistoryWithStore, routerReducer } from 'react-router-redux'

import * as reducers from './reducers'
import { App, Home, NewChannel } from './components'

const middleware = routerMiddleware(browserHistory)
const reducer = combineReducers({
  ...reducers,
  routing: routerReducer,
})
const store = createStore(
  reducer,
  applyMiddleware(middleware)
)
const history = syncHistoryWithStore(browserHistory, store)

$(() => {
  render(
    <Provider store={ store }>
      <Router history={ history }>
        <Route path="/" component={ App }>
          <IndexRoute component={ Home }/>
          <Route path="channels/new" component={ NewChannel }/>
        </Route>
      </Router>
    </Provider>,
    $('#app-container').get(0)
  )
})
