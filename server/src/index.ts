import Koa from "koa";
import getConfig from "./config";
import { connectDb } from "./db";
import getEmailer from "./email";
import getHandlers from "./handlers";
import getAuthService from "./services/auth";
import getEncryptService from "./services/encrypt";

const hostname = "0.0.0.0";
const port = 3000;

const config = getConfig();
const emailer = getEmailer(config);
connectDb(config);

const encryptService = getEncryptService();
const authService = getAuthService(config, encryptService);

const app = getHandlers(config, authService);

app.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});
