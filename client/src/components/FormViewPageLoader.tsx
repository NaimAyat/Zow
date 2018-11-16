import * as React from "react";
import FormViewPage from "./FormViewPage";
import SampleData from "../SampleData";

const FormViewPageLoader: React.SFC = () => {
  return (
    <FormViewPage formName="My Sample Form" questions={SampleData.questions} />
  );
};

export default FormViewPageLoader;
