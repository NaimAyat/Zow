import { ApolloServer, gql } from "apollo-server-koa";
import resolvers from "./resolvers";

const typeDefs = gql`
  type Query {
    hello: String
    time: Int
  }
`;

const server = new ApolloServer({ typeDefs, resolvers });
export default server;
