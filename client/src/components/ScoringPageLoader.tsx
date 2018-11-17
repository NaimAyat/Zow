import * as React from "react";
import SampleData from "../SampleData";
import ScoringPage from "./ScoringPage";

const ScoringPageLoader: React.SFC = () => {
  return (
    <ScoringPage
      formName="My Sample Form"
      questions={SampleData.questions}
      response={SampleData.responses[0]}
    />
  );
};

export default ScoringPageLoader;
