import * as React from "react";
import Page from "./Page";
import { Message } from "semantic-ui-react";

const Success: React.SFC = () => {
  return (
    <Page header="Thanks for submitting!">
      <Message success>
        <Message.Header>Success!</Message.Header>
        Check the status of your application at the email that you submitted.
      </Message>
    </Page>
  );
};

export default Success;
