import * as React from "react";
import * as ReactDOM from "react-dom";
import Success from "../components/Success";

it("renders without crashing", () => {
  const div = document.createElement("div");
  ReactDOM.render(<Success />, div);
  ReactDOM.unmountComponentAtNode(div);
});
