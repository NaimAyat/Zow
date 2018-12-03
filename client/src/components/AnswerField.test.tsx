import * as React from "react";
import * as ReactDOM from "react-dom";
import AnswerField from "./AnswerField";
import SampleData from "../SampleData";
import { IAnswer } from "../DataTypes";

describe("Answer Field", () => {
  it("renders without crashing", () => {
    const div = document.createElement("div");
    ReactDOM.render(
      <AnswerField
        question={SampleData.questions[0]}
        answer={SampleData.responses[0].answers[0]}
        setAnswer={(answer: IAnswer) => {
          alert("hi");
        }}
      />,
      div
    );
    ReactDOM.unmountComponentAtNode(div);
  });
});
