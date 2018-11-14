import * as React from "react";
import { Button, Form, Grid, Message } from "semantic-ui-react";
import { IQuestion } from "../DataTypes";

interface IQuestionProps {
  question: IQuestion;
}

class Question extends React.Component<IQuestionProps> {
  public render() {
    return (
      <Message style={{ margin: "10px" }}>
        <Grid columns={2}>
          <Grid.Column width={15}>
            <Form.Field>
              <label />
              <input placeholder="Type question here" />
              <div style={{ minHeight: "5px" }} />
              <input disabled placeholder="Answer will go here" />
            </Form.Field>
          </Grid.Column>
          <Grid.Column width={1}>
            <Button
              icon="x"
              style={{ position: "absolute", display: "inline" }}
              color="red"
              name="x"
              size="big"
            />
          </Grid.Column>
        </Grid>
      </Message>
    );
  }
}

export default Question;
