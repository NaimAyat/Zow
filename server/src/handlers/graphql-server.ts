import { ApolloServer, gql } from "apollo-server-koa";

const typeDefs = gql`
  type Query {
    currentUser: User
  }

  type Mutation {
    login(email: String!, password: String!): Boolean!
    newUser(name: String!, email: String!, password: String!): Boolean!
  }

  type User {
    id: ID!
    email: String!
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

export default function getGQLApolloServer(resolvers) {
  return new ApolloServer({
    typeDefs,
    resolvers,
    context: ({ ctx }) => ctx,
    playground: {
      settings: {
        "request.credentials": "same-origin"
      }
    }
  });
}
