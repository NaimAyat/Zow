import * as React from "react";
import * as ReactDOM from "react-dom";
import ScoringPage from "./ScoringPage";
import SampleData from "../SampleData";

describe("Scoring Page", () => {
  it("renders without crashing", () => {
    const div = document.createElement("div");
    ReactDOM.render(
      <ScoringPage
        formName="test form name"
        questions={SampleData.questions}
        response={SampleData.responses[0]}
        onSubmit={(rating: number, notes: string) => {
          return new Promise(() => {
            alert("hello");
          });
        }}
      />,
      div
    );
    ReactDOM.unmountComponentAtNode(div);
  });
});
