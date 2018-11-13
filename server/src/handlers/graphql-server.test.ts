import { ApolloServer } from "apollo-server-koa";
import getGQLApolloServer from "./graphql-server";

test("it creates a new ApolloServer", () => {
  const mockResolvers = {};
  const gqlServer = getGQLApolloServer(mockResolvers);

  expect(gqlServer).toBeDefined();
  expect(gqlServer).toBeInstanceOf(ApolloServer);
});
