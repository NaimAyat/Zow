import { ApolloServer } from "apollo-server-koa";
import request from "supertest";
import Koa from "koa";
import gqlServer from "./graphql-server";

test("it creates a new ApolloServer", () => {
  expect(gqlServer).toBeDefined();
  expect(gqlServer).toBeInstanceOf(ApolloServer);
});
