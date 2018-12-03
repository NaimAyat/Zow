import * as React from "react";
import * as ReactDOM from "react-dom";
import FormCreationPage from "./FormCreationPage";
import SampleData from "../SampleData";
import { IQuestion } from "../DataTypes";

describe("Logout", () => {
  it("renders without crashing", () => {
    const div = document.createElement("div");
    ReactDOM.render(
      <FormCreationPage
        id="234567"
        initialName="test form name"
        initialPublished
        initialQuestions={SampleData.questions}
        saveForm={(questions: IQuestion[]) => {
          return new Promise(() => {
            alert("hello");
          });
        }}
        updatePublishState={(published: boolean) => {
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
