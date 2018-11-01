import Koa from "koa";

const app = new Koa();

app.use(async ctx => {
  ctx.body = "Hello, world!";
});

const hostname = "0.0.0.0";
const port = 3000;

app.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});
