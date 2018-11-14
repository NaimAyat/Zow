import * as React from "react";
// @ts-ignore
import Reorder, { reorder } from "react-reorder";
import { Form } from "semantic-ui-react";
import Question from "./Question";

const q1 = {
  prompt: "Whats ur name?",
  type: "normal type"
};
const q2 = {
  prompt: "How much r u?",
  type: "normal type"
};
const q3 = {
  prompt:
    " Sldjfalksdjf lkasj dflkaj sdlkfj alksdjf laksdj flka jldjfalksdjf lkasj dflkaj sdlkfj alksdjf laksdj flka jldksf alksdf jlkasd fjlkaj ldjfalksdjf lkasj dflkaj sdlkfj alksdjf laksdj flka jldksf alksdf jlkasd fjlkaj ldjfalksdjf lkasj dflkaj sdlkfj alksdjf laksdj flka jldksf alksdf jlkasd fjlkaj ldjfalksdjf lkasj dflkaj sdlkfj alksdjf laksdj flka jldksf alksdf jlkasd fjlkaj ldksf alksdf jlkasd fjlkaj sdlkfj alksdjf lajsdlf j",
  type: "normal type"
};

const question1 = <Question question={q1} />;
const question2 = <Question question={q2} />;
const question3 = <Question question={q3} />;

interface IFormCreationState {
  questions: JSX.Element[];
}

class FormCreationPage extends React.Component<{}, IFormCreationState> {
  public constructor(props: any) {
    super(props);
    this.state = {
      questions: [question1, question2, question3].map((element, index) => (
        <div key={index}>{element}</div>
      ))
    };
    this.onReorder = this.onReorder.bind(this);
  }
  public onReorder(
    event: any,
    previousIndex: any,
    nextIndex: any,
    fromId: any,
    toId: any
  ) {
    this.setState({
      questions: reorder(this.state.questions, previousIndex, nextIndex)
    });
  }

  public render() {
    return (
      <Form size="big">
        <Reorder
          onReorder={this.onReorder}
          reorderId="my-list"
          lock="horizontal"
        >
          {this.state.questions}
        </Reorder>
      </Form>
    );
  }
}

export default FormCreationPage;
