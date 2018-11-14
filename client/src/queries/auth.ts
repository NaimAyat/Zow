import gql from "graphql-tag";

export const LOGIN_GQL = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password)
  }
`;

export const LOGOUT_GQL = gql`
  mutation {
    logout
  }
`;

export const GET_USER_GQL = gql`
  query {
    currentUser {
      id
      email
    }
  }
`;
