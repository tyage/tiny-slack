import koa from 'koa';
import serve from 'koa-static';
import Router from 'koa-router';

const apiRouter = Router({
  prefix: '/api'
});
apiRouter
  .get('/', function *() {
    this.body = 'Hello World';
  });

const publicRouter = Router();
publicRouter
  .get('/public/*', function *(next) {
    const [blank, prefix, ...rest] = this.path.split('/');
    this.path = rest.join('/');
    yield next;
  }, serve('public/dist'))
  .get('/', serve('views'));

const app = koa();
app.listen(3000);
app.use(apiRouter.routes());
app.use(publicRouter.routes());
