import * as React from "react";
import Page from "./Page";
import { Message } from "semantic-ui-react";

const InterviewSuccess: React.SFC = () => {
  return (
    <Page header="Thanks for your interview submission!">
      <Message success>
        <Message.Header>Success!</Message.Header>
        Thanks for signing up for an interview!
      </Message>
    </Page>
  );
};

export default InterviewSuccess;
