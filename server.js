const Koa = require('koa');
const KeyGrip = require('keygrip')
const static = require('koa-static')
const path = require('path')
const Router = require('koa-router');
const router = new Router();
const app = new Koa();

const mimeType = require('./utils/setMineType')


app.keys = new KeyGrip(['im a newer secret', 'i like turtle'], 'sha256');
// logger
// app.use(async (ctx, next) => {
//   console.log(ctx);
//   await next();
//   const rt = ctx.response.get('X-Response-Time');
// })

// x-response-time
app.use(async (ctx, next) => {
  console.log(mimeType(path.parse(ctx.url)));
  ctx.set('Content-Type', mimeType(path.parse(ctx.url)));
  const start = Date.now();
  await next();
  const ms = Date.now() - start;
  ctx.set('X-Reponse-Time',   `${ms}ms`);
  ctx.cookies.set('name', 'tobi', { signed: true });
})

app.use(async (ctx, next) => {
  ctx.body = 'hello world';
  await next();
})
// 设置静态资源的目录
app.use(static(path.resolve(__dirname, './public')))

app.listen(2000);