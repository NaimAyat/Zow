import * as React from "react";
import { Container, Header, Divider } from "semantic-ui-react";

interface IProps {
  header?: string;
  children?: any;
}

export default function Page(props: IProps) {
  return (
    <Container
      style={{
        backgroundColor: "white",
        boxShadow:
          "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)",
        padding: "20px",
        margin: "20px"
      }}
    >
      {props.header && (
        <React.Fragment>
          <Header textAlign="center" as="h1" content={props.header} />
          <Divider hidden />
        </React.Fragment>
      )}
      {props.children}
    </Container>
  );
}
