import $ from 'jquery'
import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import { createStore, combineReducers, applyMiddleware } from 'redux'
import { Router, Route, IndexRoute, browserHistory } from 'react-router'
import { routerMiddleware, syncHistoryWithStore, routerReducer } from 'react-router-redux'
import thunkMiddleware from 'redux-thunk'
import createLogger from 'redux-logger'

import * as reducers from './reducers'
import { App, NewChannel } from './components'
import { Home } from './containers'

const middleware = routerMiddleware(browserHistory)
const reducer = combineReducers({
  ...reducers,
  routing: routerReducer,
})
const store = createStore(
  reducer,
  applyMiddleware(middleware, thunkMiddleware, createLogger())
)
const history = syncHistoryWithStore(browserHistory, store)

$(() => {
  render(
    <Provider store={ store }>
      <Router history={ history }>
        <Route path="/" component={ App }>
          <IndexRoute component={ Home }/>
          <Route path="channels/new" component={ NewChannel }/>
          <Route path=":channelId" component={ Home }/>
        </Route>
      </Router>
    </Provider>,
    $('#app-container').get(0)
  )
})
