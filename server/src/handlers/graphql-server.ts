import { ApolloServer, gql } from "apollo-server-koa";

const typeDefs = gql`
  type Query {
    currentUser: User
    user(userID: ID!): User!
    form(formID: ID!): Form!
    ownedForms: [Form!]!
  }

  type Mutation {
    login(email: String!, password: String!): Boolean!
    logout: Boolean
    newUser(name: String!, email: String!, password: String!): Boolean!
    createForm: ID!
    saveForm(formID: ID!, form: FormInput): Boolean
    addResponse(formID: ID!, answers: [String]): Boolean
    addOwner(formID: ID!, userID: ID!): Boolean
  }

  type User {
    id: ID!
    email: String!
    forms: [Form]
  }

  type Question {
    id: ID!
    prompt: String!
    choices: [String]!
    type: String!
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
    name: String!
    author: [User]!
    questions: [Question]!
    responses: [Response]
    scores: [Scoring]
    slots: [InterviewSlot]
  }

  input FormInput {
    name: String!
    questions: [QuestionInput]!
  }

  input QuestionInput {
    prompt: String!
    choices: [String]!
    type: String!
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
