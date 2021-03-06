import Koa from "koa";
import session from "koa-session";
import getResolvers from "./resolvers";
import getGQLApolloServer from "./graphql-server";
import { IAuthorizationService } from "../services/auth";
import { IConfig } from "../config";
import { IFormService } from "../services/form";

export default function getHandlers(
  config: IConfig,
  authService: IAuthorizationService,
  formService: IFormService
) {
  const app = new Koa();
  app.keys = [config.getSessionSecret()];
  app.use(session({}, app));

  const resolvers = getResolvers(authService, formService, null);
  const gqlApolloServer = getGQLApolloServer(resolvers);
  gqlApolloServer.applyMiddleware({ app, path: "/api/gql" });

  return app;
}
