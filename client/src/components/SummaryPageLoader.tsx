import * as React from "react";
import SampleData from "../SampleData";
import SummaryPage from "./SummaryPage";

const ScoringPageLoader: React.SFC = () => {
  return (
    <SummaryPage
      questions={SampleData.questions}
      responses={SampleData.responses}
      scores={SampleData.scores}
    />
  );
};

export default ScoringPageLoader;
