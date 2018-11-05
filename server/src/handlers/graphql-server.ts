import { ApolloServer, gql } from "apollo-server-koa";

const typeDefs = gql`
  type User {
    id: Int!
    username: String
  }

  type Question {
    id: Int!
    prompt: String
  }

  type Answer {
    id: Int!
    question: Question
    answer: String
  }

  type Response {
    id: Int!
    respondent: String
    answers: [Answer]
  }

  type Form {
    id: Int!
    author: User
    questions: [Question]
    responses: [Response]
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
