import { ApolloServer } from "apollo-server-koa";
import gqlServer from "./graphql-server";

test("it creates a new ApolloServer", () => {
  expect(gqlServer).toBeDefined();
  expect(gqlServer).toBeInstanceOf(ApolloServer);
});
