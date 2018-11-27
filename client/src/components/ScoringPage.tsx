import * as React from "react";
import {
  Button,
  Header,
  TextArea,
  TextAreaProps,
  Rating,
  Form,
  Message
} from "semantic-ui-react";
import { IAnswer, IResponse, IQuestion } from "../DataTypes";
import Page from "./Page";

interface IProps {
  formName: string;
  questions: IQuestion[];
  response: IResponse;
}

interface IState {
  rating: number;
  notes: string;
}

class ScoringPage extends React.Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);
    this.handleRate = this.handleRate.bind(this);
    this.handleTextChange = this.handleTextChange.bind(this);
    this.state = {
      rating: 0,
      notes: ""
    };
  }
  public handleRate(event: any, { rating }: any) {
    this.setState({ rating });
  }
  public handleTextChange(event: React.SyntheticEvent, data: TextAreaProps) {
    this.setState({ notes: String(data.value) });
  }

  public getAnswer(question: IQuestion, answer: IAnswer) {
    const text = answer.answer;

    if (question.type === "checkbox") {
      const words = text.split(",");
      return words.map((word, index) => <p key={index}>{word}</p>);
    }
    return <p>{text}</p>;
  }
  public render() {
    return (
      <React.Fragment>
        <Page header="Score Applicant">
          <div style={{ textAlign: "center" }}>
            <Form size="big">
              <Form.Field>
                <Rating
                  clearable
                  icon="star"
                  maxRating={5}
                  style={{ fontSize: "4rem" }}
                  onRate={this.handleRate}
                />
              </Form.Field>
              <Form.Field>
                <TextArea
                  placeholder="Add notes"
                  onChange={this.handleTextChange}
                />
              </Form.Field>
              <Form.Field>
                <Button primary size="huge" content="Score" />
              </Form.Field>
            </Form>
          </div>
        </Page>
        <Page>
          <Header as="h1">{this.props.formName}</Header>
          <Form size="big">
            {this.props.questions.map((question, index) => (
              <Message style={{ margin: "10px" }}>
                <Form.Field required>
                  <label>{question.prompt}</label>
                  {this.getAnswer(question, this.props.response.answers[index])}
                </Form.Field>
              </Message>
            ))}
          </Form>
        </Page>
      </React.Fragment>
    );
  }
}

export default ScoringPage;
