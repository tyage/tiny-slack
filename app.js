import koa from 'koa'
import serve from 'koa-static'
import send from 'koa-send'
import Router from 'koa-router'
import parse from 'co-body'
import json from 'koa-json'

const channels = []
let nextMessageId = 0
const messages = {}

const apiRouter = Router({
  prefix: '/api'
})
apiRouter
  .post('/channels/new', function *() {
    const { name } = yield parse(this)
    const channel = {
      id: name,
      name
    }

    channels.push(channel)

    this.body = {
      channel
    }
  })
  .get('/channels', function *() {
    this.body = {
      channels
    }
  })
  .post('/messages/:channelId/new', function *() {
    const channelId = this.params.channelId
    const { username, text } = yield parse(this)
    const message = {
      id: ++nextMessageId,
      channelId,
      username,
      text,
      createdAt: new Date()
    }

    if (!messages[channelId]) {
      messages[channelId] = []
    }
    messages[channelId].push(message)

    this.body = {
      message
    }
  })
  .get('/messages/:channelId', function *() {
    const channelId = this.params.channelId

    this.body = {
      messages: messages[channelId] || []
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
app.listen(3000)
app.use(json())
app.use(apiRouter.routes())
app.use(publicRouter.routes())
