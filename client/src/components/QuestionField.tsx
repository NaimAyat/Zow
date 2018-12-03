import * as React from "react";
import {
  Form,
  Grid,
  Icon,
  Input,
  Menu,
  Message,
  TextArea
} from "semantic-ui-react";
import { IQuestion } from "../DataTypes";

interface IProps {
  question: IQuestion;
  setQuestion: (question: IQuestion) => void;
  deleteQuestion: () => void;
}

interface IState {
  option: string;
}

class QuestionField extends React.Component<IProps, IState> {
  public constructor(props: IProps) {
    super(props);
    this.addOption = this.addOption.bind(this);
    this.handleQuestionChange = this.handleQuestionChange.bind(this);
    this.handleOptionChange = this.handleOptionChange.bind(this);
    this.state = { option: "" };
  }

  public getAnswerField() {
    switch (this.props.question.type) {
      case "SHORT_TEXT":
        return <input disabled placeholder="Short answer will go here" />;
      case "LONG_TEXT":
        return <TextArea disabled placeholder="Long answer will go here" />;
      case "PHONE":
        return <input disabled placeholder="(555) 555-5555" />;
      case "EMAIL":
        return <input disabled placeholder="example@ucla.edu" />;
      case "DROPDOWN":
      case "RADIO":
      case "CHECKBOX":
        if (this.props.question.options == null) {
          const question = { ...this.props.question };
          question.options = [];
          this.props.setQuestion(question);
        }
        return this.getAddOptionArea();
    }
  }

  public getAddOptionArea() {
    return (
      <React.Fragment>
        <Menu vertical fluid style={{ maxWidth: "50%", margin: "auto" }}>
          {(this.props.question.options || []).map((option, index) => (
            <Menu.Item>
              {option}
              <Icon
                style={{ cursor: "pointer" }}
                name="delete"
                onClick={this.getDeleteOption(index)}
                color="red"
              />
            </Menu.Item>
          ))}
          <Menu.Item>
            <Input
              placeholder={"Add " + this.getQuestionType() + " option"}
              onChange={this.handleOptionChange}
              value={this.state.option}
              action={{ icon: "plus", onClick: this.addOption }}
            />
          </Menu.Item>
        </Menu>
      </React.Fragment>
    );
  }

  public getQuestionType() {
    switch (this.props.question.type) {
      case "EMAIL":
        return "email";
      case "PHONE":
        return "phone";
      case "LONG_TEXT":
        return "long text";
      case "SHORT_TEXT":
        return "short text";
      case "RADIO":
        return "radio button";
      case "CHECKBOX":
        return "checkbox";
      case "DROPDOWN":
        return "dropdown";
    }
  }

  public handleQuestionChange(event: React.ChangeEvent<HTMLInputElement>) {
    event.preventDefault();
    const prompt = event.target.value;
    const question = { ...this.props.question, prompt };
    this.props.setQuestion(question);
  }

  public handleOptionChange(event: React.ChangeEvent<HTMLInputElement>) {
    event.preventDefault();
    const option = event.target.value;
    this.setState({ option });
  }

  public addOption() {
    const option = this.state.option;
    if (!option) {
      return;
    }
    const question = { ...this.props.question };
    if (question.options) {
      question.options.push(option);
    } else {
      question.options = [option];
    }
    this.props.setQuestion(question);
    this.setState({ option: "" });
  }
  public getDeleteOption(index: number) {
    return () => {
      const question = { ...this.props.question };
      question.options!.splice(index, 1);
      this.props.setQuestion(question);
    };
  }

  public render() {
    return (
      <Message style={{ margin: "10px" }}>
        <Grid columns={2}>
          <Grid.Column width={15}>
            <Form.Field>
              <Input
                placeholder={
                  "Type " + this.getQuestionType() + " question here..."
                }
                onChange={this.handleQuestionChange}
                value={this.props.question.prompt}
              />
              <div style={{ minHeight: "5px" }} />
              {this.getAnswerField()}
            </Form.Field>
          </Grid.Column>
          <Grid.Column width={1}>
            <Icon
              style={
                this.props.question.type === "EMAIL"
                  ? null
                  : { cursor: "pointer" }
              }
              name="x"
              color="red"
              size="big"
              disabled={this.props.question.type === "EMAIL"}
              onClick={
                this.props.question.type === "EMAIL"
                  ? null
                  : this.props.deleteQuestion
              }
            />
            {/* <Icon name="arrow up" color="black" size="large" />
            <Icon name="arrow down" color="black" size="large" /> */}
          </Grid.Column>
        </Grid>
      </Message>
    );
  }
}

export default QuestionField;
