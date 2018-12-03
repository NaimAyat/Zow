import * as React from "react";
import Page from "./Page";
import { Message, Button } from "semantic-ui-react";
import { Link } from "react-router-dom";

const Success: React.SFC = () => {
  return (
    <Page header="Error 404">
      <Message error>
        <Message.Header>Uh-oh!</Message.Header>
        Looks like we can't find the page you were looking for.
      </Message>
      <Link to="/">
        <Button primary content="Take me home" />
      </Link>
    </Page>
  );
};

export default Success;
