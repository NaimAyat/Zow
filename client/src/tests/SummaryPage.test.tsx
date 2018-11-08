import * as React from "react";
import * as ReactDOM from "react-dom";
import SummaryPage from "../components/SummaryPage";

it("renders without crashing", () => {
  const div = document.createElement("div");
  ReactDOM.render(<SummaryPage />, div);
  ReactDOM.unmountComponentAtNode(div);
});
