const Koa = require('koa');
const KeyGrip = require('keygrip')
const static = require('koa-static')
const path = require('path')
const Router = require('koa-router');
const router = new Router();
const app = new Koa();



app.keys = new KeyGrip(['im a newer secret', 'i like turtle'], 'sha256');
// logger
// app.use(async (ctx, next) => {
//   console.log(ctx);
//   await next();
//   const rt = ctx.response.get('X-Response-Time');
// })

// x-response-time
app.use(async (ctx, next) => {
  const start = Date.now();
  await next();
  const ms = Date.now() - start;
  ctx.set('X-Reponse-Time',   `${ms}ms`);
  ctx.set('Content-Type', 'text/html;charset=utf-8')
  ctx.cookies.set('name', 'tobi', { signed: true });
})

app.use(async (ctx, next) => {
  ctx.body = 'hello world';
  await next();
})
// 设置静态资源的目录
app.use(static(path.resolve(__dirname, './public')))

app.listen(2000);