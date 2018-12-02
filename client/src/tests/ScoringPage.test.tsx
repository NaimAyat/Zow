import * as React from "react";
import * as ReactDOM from "react-dom";
import ScoringPageLoader from "../components/ScoringPageLoader";

it("renders without crashing", () => {
  const div = document.createElement("div");
  ReactDOM.render(<ScoringPageLoader />, div);
  ReactDOM.unmountComponentAtNode(div);
});
