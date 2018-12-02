import * as React from "react";
import * as ReactDOM from "react-dom";
import SummaryPageLoader from "../components/SummaryPageLoader";

it("renders without crashing", () => {
  const div = document.createElement("div");
  ReactDOM.render(<SummaryPageLoader />, div);
  ReactDOM.unmountComponentAtNode(div);
});
