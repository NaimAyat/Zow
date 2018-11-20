import * as React from "react";
import { Container } from "semantic-ui-react";

const Page: React.SFC = props => {
  return (
    <Container
      style={{
        backgroundColor: "white",
        borderRadius: "5px",
        padding: "20px",
        margin: "20px"
      }}
    >
      {props.children}
    </Container>
  );
};

export default Page;
