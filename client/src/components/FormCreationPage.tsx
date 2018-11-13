import * as React from "react";
// import { Header } from "semantic-ui-react";
// @ts-ignore
import Reorder, { reorder } from "react-reorder";

const red = <div style={{ backgroundColor: "red", minHeight: "100px" }} />;
const green = <div style={{ backgroundColor: "green", minHeight: "100px" }} />;
const yellow = (
  <div style={{ backgroundColor: "yellow", minHeight: "100px" }} />
);
const black = <div style={{ backgroundColor: "black", minHeight: "100px" }} />;
const blue = <div style={{ backgroundColor: "blue", minHeight: "100px" }} />;

interface IFormCreationState {
  questions: JSX.Element[];
}

class FormCreationPage extends React.Component<{}, IFormCreationState> {
  public constructor(props: any) {
    super(props);
    this.state = { questions: [red, green, yellow, black, blue] };
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
      <Reorder onReorder={this.onReorder} reorderId="my-list">
        {this.state.questions}
      </Reorder>
    );
  }
}

export default FormCreationPage;
