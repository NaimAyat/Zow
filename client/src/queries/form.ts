import gql from "graphql-tag";

export const GET_FORM_GQL = gql`
  query form($id: ID!) {
    form(formID: $id) {
      name
      questions {
        prompt
        type
      }
    }
  }
`;
