import koa from 'koa'
import serve from 'koa-static'
import send from 'koa-send'
import Router from 'koa-router'
import parse from 'co-body'
import json from 'koa-json'

const channels = []

const apiRouter = Router({
  prefix: '/api'
})
apiRouter
  .get('/', function *() {
    this.body = 'Hello World'
  })
  .post('/channels/new', function *(next) {
    const post = yield parse(this)
    const channel = {
      id: post.name,
      name: post.name
    }

    channels.push(channel)

    this.body = {
      channel
    }
  })
  .get('/channels', function *(next) {
    this.body = {
      channels
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
