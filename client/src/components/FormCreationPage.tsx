import * as React from "react";
import {
  Button,
  Form,
  Grid,
  Header,
  Input,
  Segment,
  Label
} from "semantic-ui-react";
import { IQuestion, QuestionType } from "src/DataTypes";
import Page from "./Page";
import QuestionField from "./QuestionField";
import { Link } from "react-router-dom";

interface IProps {
  id: string;
  initialPublished: boolean;
  initialQuestions: IQuestion[];
  initialName: string;
  saveForm(questions: IQuestion[], formName: string): Promise<void>;
  updatePublishState(published: boolean): Promise<void>;
}

interface IState {
  questions: IQuestion[];
  formName: string;
  published: boolean;
}

class FormCreationPage extends React.Component<IProps, IState> {
  public constructor(props: IProps) {
    super(props);
    this.state = {
      questions: props.initialQuestions,
      formName: props.initialName,
      published: props.initialPublished
    };
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
      if (type === "CHECKBOX" || type === "RADIO" || type === "DROPDOWN") {
        question.options = [];
      }
      questions.push(question);
      this.setState({ questions });
    };
  }

  public onChangeFormName(event: React.ChangeEvent<HTMLInputElement>) {
    const formName = event.target.value;
    this.setState({ formName });
  }

  public render() {
    return (
      <React.Fragment>
        <Page>
          <Header as="h1" textAlign="center">
            Form Creation
          </Header>
          <Input
            value={this.state.formName}
            size="huge"
            placeholder="Type form name here..."
            onChange={this.onChangeFormName}
            floated="left"
            style={{ minWidth: "80%" }}
          />
          &nbsp;&nbsp;&nbsp;
          {this.state.published ? (
            <Label floated="right" color="blue" content="Published" tag />
          ) : (
            <Label floated="right" content="Unpublished" tag />
          )}
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
        </Page>
        <Page>
          <Segment textAlign="center">
            <Header as="h3" content="Add New Question" />
            <Grid textAlign="center">
              <Grid.Row>
                <Button
                  icon="phone"
                  onClick={this.getAddQuestion("PHONE")}
                  content="Phone"
                />
                <Button
                  icon="window minimize outline"
                  onClick={this.getAddQuestion("SHORT_TEXT")}
                  content="Short Text"
                />
                <Button
                  icon="bars"
                  onClick={this.getAddQuestion("LONG_TEXT")}
                  content="Long Text"
                />
              </Grid.Row>
              <Grid.Row>
                <Button
                  icon="dot circle"
                  onClick={this.getAddQuestion("RADIO")}
                  content="Radio Button"
                />
                <Button
                  icon="check square"
                  onClick={this.getAddQuestion("CHECKBOX")}
                  content="Checkbox"
                />
                <Button
                  icon="chevron down"
                  onClick={this.getAddQuestion("DROPDOWN")}
                  content="Drop Down"
                />
              </Grid.Row>
            </Grid>
          </Segment>
          <Header textAlign="center">
            <Link to={"/summary/" + this.props.id}>
              <Button size="huge" icon="angle left" content="Back" />
            </Link>
            <Button
              secondary
              size="huge"
              content="Save"
              icon="save"
              onClick={() => {
                this.props
                  .saveForm(this.state.questions, this.state.formName)
                  .then(() => alert("Successfully saved form"));
              }}
            />
            <Button
              size="huge"
              color={this.state.published ? undefined : "blue"}
              icon="file alternate outline"
              content={this.state.published ? "Unpublish" : "Save and Publish"}
              onClick={async () => {
                if (!this.state.published) {
                  await this.props.saveForm(
                    this.state.questions,
                    this.state.formName
                  );
                }
                await this.props.updatePublishState(!this.state.published);
                this.setState({ published: !this.state.published });
              }}
            />
          </Header>
        </Page>
      </React.Fragment>
    );
  }
}

export default FormCreationPage;
