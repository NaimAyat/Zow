import Koa from "koa";

import gqlApolloServer from "./graphql-server";

const app = new Koa();
gqlApolloServer.applyMiddleware({ app, path: "/api/gql" });

export default app;
