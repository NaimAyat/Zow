import * as React from "react";
import { Button, Divider, Header, Form } from "semantic-ui-react";
import { IAnswer, IQuestion, IResponse } from "../DataTypes";
import AnswerField from "./AnswerField";
import Page from "./Page";

interface IProps {
  formName: string;
  questions: IQuestion[];
  onSubmit: (response: IResponse) => Promise<void>;
}

interface IState {
  response: IResponse;
}

class FormViewPage extends React.Component<IProps, IState> {
  public constructor(props: IProps) {
    super(props);
    const response: IResponse = {
      answers: this.props.questions.map(question => ({
        answer: ""
      })),
      email: ""
    };
    this.state = { response };
    this.getSetAnswer = this.getSetAnswer.bind(this);
  }

  public getSetAnswer(index: number) {
    return (answer: IAnswer) => {
      const response = { ...this.state.response };
      response.answers[index] = answer;
      if (this.props.questions[index].type === "EMAIL") {
        response.email = answer.answer;
      }
      this.setState({ response });
    };
  }

  public render() {
    return (
      <Page>
        <Header as="h1">{this.props.formName}</Header>
        <Form size="big">
          {this.props.questions.map((question, index) => (
            <AnswerField
              key={index}
              question={question}
              answer={this.state.response.answers[index]}
              setAnswer={this.getSetAnswer(index)}
            />
          ))}
        </Form>
        <Divider style={{ minHeight: "20px" }} hidden />
        <Button
          fluid
          primary
          style={{ maxWidth: "25%", margin: "auto" }}
          size="huge"
          content="Submit"
          onClick={() => {
            this.props.onSubmit(this.state.response);
          }}
        />
      </Page>
    );
  }
}

export default FormViewPage;
