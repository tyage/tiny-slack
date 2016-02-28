import serve from 'koa-static'
import send from 'koa-send'
import Router from 'koa-router'

const publicRouter = Router()
  .get('/public/*', function *(next) {
    const [blank, prefix, ...rest] = this.path.split('/')
    this.path = rest.join('/')
    yield next
  }, serve('public/dist'))
  .get('/*', function *() {
    yield send(this, './views/index.html')
  })

export default (app) => {
  app.use(publicRouter.routes())
}
