import { ApolloServer, gql } from "apollo-server-koa";
import resolvers from "./resolvers";

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
    responses: [Response]
    scores: [Scoring]
    slots: [InterviewSlot]
  }

  type Scoring {
    id: ID!
    user: User!
    score: Int!
  }

  type InterviewSlot {
    id: ID!
    start: Int!
    end: Int!
    claimedBy: User
  }
`;

const server = new ApolloServer({ typeDefs, resolvers });
export default server;
