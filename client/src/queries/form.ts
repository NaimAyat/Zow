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

export const NEW_FORM_GQL = gql`
  mutation {
    createForm
  }
`;

export const SAVE_FORM_GQL = gql`
  mutation saveForm($id: ID!, $form: FormInput!) {
    saveForm(formID: $id, form: $form)
  }
`;

export const OWNED_FORMS_GQL = gql`
  query {
    ownedForms {
      id
      name
    }
  }
`;
