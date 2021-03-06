import gql from "graphql-tag";

export const GET_FORM_GQL = gql`
  query form($id: ID!) {
    form(formID: $id) {
      name
      published
      questions {
        prompt
        type
        options
      }
    }
  }
`;

export const GET_INTERVIEWS_GQL = gql`
  query form($token: String!) {
    getInterviewSlots(token: $token) {
      start
      end
      id
    }
  }
`;

export const GET_SUMMARY_DATA = gql`
  query summaryData($id: ID!) {
    form(formID: $id) {
      name
      published
      questions {
        id
        prompt
        type
        options
      }
      responses {
        id
        email
        answers {
          value
        }
        scoring {
          score
        }
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

export const ADD_RESPONSE_GQL = gql`
  mutation addResponse($formID: ID!, $email: String!, $answers: [String]!) {
    addResponse(formID: $formID, email: $email, answers: $answers)
  }
`;

export const UPDATE_PUBLISH_STATE_GQL = gql`
  mutation setPublishState($formID: ID!, $published: Boolean!) {
    setPublishState(formID: $formID, published: $published)
  }
`;

export const SUBMIT_SCORE_GQL = gql`
  mutation addScore($responseID: ID!, $score: Int!, $notes: String) {
    addScore(responseID: $responseID, score: $score, notes: $notes)
  }
`;

export const INTERVIEW_GQL = gql`
  mutation requestInterviewFrom($formID: ID!, $userEmail: String!) {
    requestInterviewFrom(formID: $formID, userEmail: $userEmail)
  }
`;

export const ADD_INTERVIEW_SLOT = gql`
  mutation addInterviewSlot(
    $formID: ID!
    $startTime: Float!
    $endTime: Float!
  ) {
    addInterviewSlot(formID: $formID, startTime: $startTime, endTime: $endTime)
  }
`;

export const ADD_OWNER = gql`
  mutation addOwner($formID: ID!, $newOwner: String!) {
    addOwner(formID: $formID, newOwner: $newOwner)
  }
`;
