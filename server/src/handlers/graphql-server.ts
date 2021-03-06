import { ApolloServer, gql } from "apollo-server-koa";

const typeDefs = gql`
  type Query {
    currentUser: User
    user(userID: ID!): User!
    form(formID: ID!): Form!
    ownedForms: [Form!]!
    getInterviewSlots(token: String!): [InterviewSlot]!
  }

  type Mutation {
    login(email: String!, password: String!): Boolean!
    logout: Boolean
    newUser(name: String!, email: String!, password: String!): Boolean!
    createForm: ID!
    saveForm(formID: ID!, form: FormInput): Boolean
    setPublishState(formID: ID!, published: Boolean!): Boolean!
    addResponse(formID: ID!, email: String, answers: [String]): Boolean
    addOwner(formID: ID!, userID: ID!): Boolean
    addScore(responseID: ID!, score: Int!, notes: String): Boolean
    getAvgScore(responseID: ID!): Float

    addInterviewSlot(formID: ID!, startTime: Float!, endTime: Float!): ID!
    removeInterviewSlot(formID: ID!, slotID: ID!): Boolean
    claimInterviewSlot(slotID: ID!, token: String!): Boolean
    requestInterviewFrom(formID: ID!, userEmail: String!): Boolean
  }

  type User {
    id: ID!
    email: String!
    forms: [Form]
  }

  type Question {
    id: ID!
    prompt: String!
    options: [String]!
    type: String!
  }

  type Answer {
    id: ID!
    question: Question!
    value: String!
  }

  type Response {
    id: ID!
    email: String!
    answers: [Answer]!
    scoring: [Scoring]
  }

  type Form {
    id: ID!
    name: String!
    author: [User]!
    questions: [Question]!
    responses: [Response]
    slots: [InterviewSlot]
    published: Boolean!
  }

  input FormInput {
    name: String!
    questions: [QuestionInput]!
  }

  input QuestionInput {
    prompt: String!
    options: [String]
    type: String!
  }

  type Scoring {
    id: ID!
    user: User!
    score: Int!
  }

  type InterviewSlot {
    id: ID!
    start: Float!
    end: Float!
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
