import 'babel-core/register'
import 'babel-polyfill'

import koa from 'koa'
import json from 'koa-json'

import config from '../../config.json'
import apiRouter from './apiRouter'
import publicRouter from './publicRouter'

const app = koa()
app.listen(config.server.listenPort)
app.use(json())
app.use(apiRouter.routes())
app.use(publicRouter.routes())
