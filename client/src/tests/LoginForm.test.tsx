import * as React from "react";
import * as ReactDOM from "react-dom";
import LoginForm from "../components/SummaryPage";

it("renders without crashing", () => {
  const div = document.createElement("div");
  ReactDOM.render(<LoginForm />, div);
  ReactDOM.unmountComponentAtNode(div);
});
