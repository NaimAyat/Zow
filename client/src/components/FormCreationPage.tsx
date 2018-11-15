import * as React from "react";
import { Button, Form, Header, Input, Segment } from "semantic-ui-react";
import { IQuestion, QuestionType } from "src/DataTypes";
import QuestionField from "./QuestionField";

interface IState {
  questions: IQuestion[];
  formName: string;
}

class FormCreationPage extends React.Component<{}, IState> {
  public constructor(props: any) {
    super(props);
    const emailQuestion: IQuestion = {
      prompt: "Email",
      type: "email"
    };
    this.state = { questions: [emailQuestion], formName: "" };
    this.onChangeFormName = this.onChangeFormName.bind(this);
  }

  public getSetQuestion(index: number) {
    return (question: IQuestion) => {
      const questions = [...this.state.questions];
      questions[index] = question;
      this.setState({ questions });
    };
  }

  public getDeleteQuestion(index: number) {
    return () => {
      const questions = [...this.state.questions];
      questions.splice(index, 1);
      this.setState({ questions });
    };
  }

  public getAddQuestion(type: QuestionType) {
    return () => {
      const questions = [...this.state.questions];
      const question: IQuestion = {
        prompt: "",
        type
      };
      if (type === "checkBox" || type === "radio" || type === "dropDown") {
        question.options = [];
      }
      questions.push(question);
      this.setState({ questions });
    };
  }

  public hasPhoneQuestion(): boolean {
    for (const question of this.state.questions) {
      if (question.type === "phone") {
        return true;
      }
    }
    return false;
  }

  public onChangeFormName(event: React.ChangeEvent<HTMLInputElement>) {
    const formName = event.target.value;
    this.setState({ formName });
  }

  public render() {
    return (
      <React.Fragment>
        <Header as="h3">Create Form</Header>
        <Input
          fluid
          size="huge"
          placeholder="Type form name here..."
          onChange={this.onChangeFormName}
        />
        <Form size="big">
          {this.state.questions.map((question, index) => (
            <QuestionField
              key={index}
              question={question}
              setQuestion={this.getSetQuestion(index)}
              deleteQuestion={this.getDeleteQuestion(index)}
            />
          ))}
        </Form>
        <Segment textAlign="center">
          <Header as="h3" content="Add New Question" />
          {this.hasPhoneQuestion() || (
            <Button
              icon="phone"
              onClick={this.getAddQuestion("phone")}
              content="Phone"
            />
          )}
          <Button
            icon="window minimize outline"
            onClick={this.getAddQuestion("shortText")}
            content="Short Text"
          />
          <Button
            icon="bars"
            onClick={this.getAddQuestion("longText")}
            content="Long Text"
          />
          <Button
            icon="dot circle"
            onClick={this.getAddQuestion("radio")}
            content="Radio Button"
          />
          <Button
            icon="check square"
            onClick={this.getAddQuestion("checkBox")}
            content="Checkbox"
          />
          <Button
            icon="chevron down"
            onClick={this.getAddQuestion("dropDown")}
            content="Drop Down"
          />
        </Segment>
        <Button
          fluid
          primary
          style={{ maxWidth: "25%", margin: "auto" }}
          size="huge"
          content="Publish"
        />
      </React.Fragment>
    );
  }
}

export default FormCreationPage;
