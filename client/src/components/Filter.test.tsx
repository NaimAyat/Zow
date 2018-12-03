import * as React from "react";
import * as ReactDOM from "react-dom";
import Filter from "./Filter";
import SampleData from "../SampleData";
import { IFilter } from "../DataTypes";

describe("Filter", () => {
  it("renders without crashing", () => {
    const div = document.createElement("div");
    const filter: IFilter = {
      prompt: "Questions?",
      type: "greater than",
      search: "custom search"
    };
    ReactDOM.render(
      <Filter
        setFilters={(filters: IFilter[]) => {
          alert("hi");
        }}
        filters={[filter]}
        questions={SampleData.questions}
      />,
      div
    );
    ReactDOM.unmountComponentAtNode(div);
  });
});
