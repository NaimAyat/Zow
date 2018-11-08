import { ApolloServer, gql } from "apollo-server-koa";

const typeDefs = gql`
  type Query {
    user(username: String!): User
    form(user: User!): Form
  }

  type User {
    id: ID!
    username: String!
    forms: [Form]
  }

  interface Question {
    id: ID!
    prompt: String!
  }

  type ChoiceQuestion implements Question {
    id: ID!
    prompt: String!
    options: [String]!
  }

  type TextQuestion implements Question {
    id: ID!
    prompt: String!
  }

  type Answer {
    id: ID!
    question: Question!
    answer: String!
  }

  type Response {
    id: ID!
    respondent: String!
    answers: [Answer]!
  }

  type Form {
    id: ID!
    author: [User]!
    questions: [Question]!
    responses: [Response]!
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
