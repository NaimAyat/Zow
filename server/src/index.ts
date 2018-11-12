import Koa from "koa";
import getConfig from "./config";
import getEmailer from "./email";
import app from "./handlers";
import mongoose from 'mongoose';
import {connectDb} from './db'


const hostname = "0.0.0.0";
const port = 3000;

const config = getConfig();
const emailer = getEmailer(
  config.getEmailerKey(),
  config.getEmailerFromAddress()
);

connectDb(config);

app.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});
