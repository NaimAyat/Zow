import { ApolloServer, gql } from "apollo-server-koa";

const typeDefs = gql`
  type Query {
    hello: String
  }
`;

const resolvers = {
  Query: {
    hello: () => "Hello, world!"
  }
};

const server = new ApolloServer({ typeDefs, resolvers });
export default server;
