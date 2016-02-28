import koa from 'koa'
import serve from 'koa-static'
import send from 'koa-send'
import Router from 'koa-router'
import parse from 'co-body'
import json from 'koa-json'
import monk from 'monk'
import monkWrapper from 'co-monk'

import config from './config'

const db = monk(config.mongoDb.uri)
const channels = monkWrapper(db.get('channels'))
const messages = monkWrapper(db.get('messages'))

const apiRouter = Router({
  prefix: '/api'
})
apiRouter
  .post('/channels/new', function *() {
    const { name } = yield parse(this)
    const channel = {
      name
    }

    // check if channel is unique
    const existChannel = yield channels.find({ name })
    if (existChannel.length > 0) {
      this.body = {
        error: `Channel ${name} is already exists`
      }
      return;
    }

    // validate channel name
    if (!(/^[0-9a-zA-Z_]+$/.test(name))) {
      this.body = {
        error: `${name} is invalid channel name`
      }
      return;
    }

    yield channels.insert(channel)
    this.body = {
      channel
    }
  })
  .get('/channels', function *() {
    this.body = {
      channels: yield channels.find({})
    }
  })
  .post('/messages/:channelId/new', function *() {
    const channelId = this.params.channelId
    const { username, text } = yield parse(this)
    const message = {
      channelId,
      username,
      text,
      createdAt: new Date()
    }

    yield messages.insert(message)

    this.body = {
      message
    }
  })
  .get('/messages/:channelId', function *() {
    const channelId = this.params.channelId
    const channelMessages = yield messages.find({ channelId })

    this.body = {
      messages: channelMessages
    }
  })

const publicRouter = Router()
publicRouter
  .get('/public/*', function *(next) {
    const [blank, prefix, ...rest] = this.path.split('/')
    this.path = rest.join('/')
    yield next
  }, serve('public/dist'))
  .get('/*', function *() {
    yield send(this, './views/index.html')
  })

const app = koa()
app.listen(config.server.listenPort)
app.use(json())
app.use(apiRouter.routes())
app.use(publicRouter.routes())
