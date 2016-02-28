import 'babel-core/register'
import 'babel-polyfill'

import koa from 'koa.io'

import config from '../../config.json'
import apiRouter from './apiRouter'
import publicRouter from './publicRouter'

const app = koa()
apiRouter(app)
publicRouter(app)
app.listen(config.server.listenPort)
