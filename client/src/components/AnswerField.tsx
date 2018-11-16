import * as React from "react";
import {
  Input,
  Dropdown,
  Form,
  Message,
  Radio,
  CheckboxProps,
  Checkbox,
  DropdownProps,
  TextArea,
  TextAreaProps
} from "semantic-ui-react";
import { IAnswer, IQuestion } from "../DataTypes";

interface IProps {
  question: IQuestion;
  answer: IAnswer;
  setAnswer: (answer: IAnswer) => void;
}

interface IState {
  error?: string;
}

class AnswerField extends React.Component<IProps, IState> {
  public constructor(props: IProps) {
    super(props);
    this.state = {};
    this.handleAnswerChange = this.handleAnswerChange.bind(this);
    this.handleRadioChange = this.handleRadioChange.bind(this);
    this.handleDropdownChange = this.handleDropdownChange.bind(this);
    this.handleTextChange = this.handleTextChange.bind(this);
    this.handleCheckboxChange = this.handleCheckboxChange.bind(this);
  }

  public handleTextChange(event: React.SyntheticEvent, data: TextAreaProps) {
    const answer = { answer: String(data.value) };
    this.props.setAnswer(answer);
  }

  public handleAnswerChange(event: React.ChangeEvent<HTMLInputElement>) {
    const answer = { answer: event.target.value };
    this.props.setAnswer(answer);
  }

  public handleCheckboxChange(
    event: React.FormEvent<HTMLInputElement>,
    data: CheckboxProps
  ) {
    let answers = this.props.answer.answer.split(",");
    const value = String(data.value);
    if (data.checked) {
      answers.push(value);
    } else {
      answers = answers.filter(element => element !== value);
    }
    const answer = { answer: answers.join(",") };
    this.props.setAnswer(answer);
  }

  public handleRadioChange(
    event: React.FormEvent<HTMLInputElement>,
    data: CheckboxProps
  ) {
    const answer = { answer: String(data.value) };
    this.props.setAnswer(answer);
  }

  public handleDropdownChange(
    event: React.FormEvent<HTMLInputElement>,
    data: DropdownProps
  ) {
    const answer = { answer: String(data.value) };
    this.props.setAnswer(answer);
  }

  public getHandleRegex(error: string, regex: RegExp) {
    return (event: React.ChangeEvent<HTMLInputElement>) => {
      const text = event.target.value;
      const validEmail = regex.test(String(text).toLowerCase());
      if (validEmail) {
        this.handleAnswerChange(event);
        this.setState({ error: undefined });
      } else {
        this.setState({ error });
      }
    };
  }

  public getInput() {
    switch (this.props.question.type) {
      case "email":
        return (
          <Input
            placeholder="Email"
            onChange={this.getHandleRegex(
              "Invalid Email",
              /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
            )}
          />
        );
      case "phone":
        return (
          <Input
            placeholder="Phone"
            onChange={this.getHandleRegex(
              "Invalid Phone",
              /^\s*(?:\+?(\d{1,3}))?[-. (]*(\d{3})[-. )]*(\d{3})[-. ]*(\d{4})(?: *x(\d+))?\s*$/
            )}
          />
        );
      case "longText":
        return (
          <TextArea placeholder="Answer" onChange={this.handleTextChange} />
        );
      case "shortText":
        return (
          <Input placeholder="Answer" onChange={this.handleAnswerChange} />
        );
      case "radio":
        return this.props.question.options!.map((option, index) => (
          <Form.Field key={index}>
            <Radio
              label={option}
              name="radioGroup"
              value={option}
              checked={this.props.answer.answer === option}
              onChange={this.handleRadioChange}
            />
          </Form.Field>
        ));
      case "dropdown":
        const dropdownOptions = this.props.question.options!.map(option => ({
          key: option,
          text: option,
          value: option
        }));
        return (
          <Dropdown
            placeholder="Select"
            search
            selection
            options={dropdownOptions}
            onChange={this.handleDropdownChange}
          />
        );
      case "checkbox":
        return this.props.question.options!.map(option => (
          <Form.Field>
            <Checkbox
              label={option}
              name="checkboxGroup"
              value={option}
              checked={this.props.answer.answer.split(",").includes(option)}
              onChange={this.handleCheckboxChange}
            />
          </Form.Field>
        ));
    }
  }

  public render() {
    return (
      <React.Fragment>
        <Message style={{ margin: "10px" }}>
          <Form.Field required>
            <label>{this.props.question.prompt}</label>
            {this.getInput()}
            {this.state.error && (
              <Message negative content={this.state.error} />
            )}
          </Form.Field>
        </Message>
      </React.Fragment>
    );
  }
}

export default AnswerField;
