import Koa from "koa";
import getConfig from "./config";
import getEmailer from "./email";
import app from "./handlers";

const hostname = "0.0.0.0";
const port = 3000;

const config = getConfig();
const emailer = getEmailer(
  config.getEmailerKey(),
  config.getEmailerFromAddress()
);

app.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});
