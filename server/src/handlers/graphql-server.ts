import { ApolloServer, gql } from "apollo-server-koa";

const typeDefs = gql`
  type Query {
    hello: String
    time: Int
  }
`;

const resolvers = {
  Query: {
    hello: () => "Hello, world!",
    time: () => Math.floor(new Date().getTime() / 1000)
  }
};

const server = new ApolloServer({ typeDefs, resolvers });
export default server;
