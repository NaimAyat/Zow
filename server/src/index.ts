import Koa from "koa";
import getConfig from "./config";
import { connectDb } from "./db";
import getEmailer from "./email";
import getHandlers from "./handlers";
import getAuthService from "./services/auth";
import getEncryptService from "./services/encrypt";
import { DatabaseFormService } from "./services/form";

const hostname = "0.0.0.0";
const port = 3000;

const config = getConfig();
const emailer = getEmailer(config);
connectDb(config);

const encryptService = getEncryptService();
const authService = getAuthService(config, encryptService);
const formService = new DatabaseFormService();

const app = getHandlers(config, authService, formService);

app.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});
