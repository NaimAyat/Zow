import * as React from "react";

import SummaryPage from "./SummaryPage";
import { RouteComponentProps } from "react-router";
import { Query } from "react-apollo";
import { GET_SUMMARY_DATA } from "../queries/form";
import { Loader } from "semantic-ui-react";

interface IProps extends RouteComponentProps<{ id: string }> {}

const SummaryPageLoader: React.SFC<IProps> = props => {
  return (
    <Query
      query={GET_SUMMARY_DATA}
      variables={{ id: props.match.params.id }}
      pollInterval={1000}
    >
      {({ loading, error, data }) => {
        return !loading && data ? (
          <SummaryPage id={props.match.params.id} form={data.form} />
        ) : (
          <Loader />
        );
      }}
    </Query>
  );
};

export default SummaryPageLoader;
