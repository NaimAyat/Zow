import * as React from "react";
import SummaryPage from "./SummaryPage";
import { RouteComponentProps } from "react-router";
import { Query, Mutation } from "react-apollo";
import { GET_SUMMARY_DATA, INTERVIEW_GQL } from "../queries/form";
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
          <Mutation mutation={INTERVIEW_GQL}>
            {offerInterview => {
              return (
                <SummaryPage
                  offerInterview={email => {
                    offerInterview({
                      variables: {
                        formID: props.match.params.id,
                        userEmail: email
                      }
                    }).then(() => {
                      alert("Interview requested");
                    });
                  }}
                  id={props.match.params.id}
                  form={data.form}
                  history={props.history}
                />
              );
            }}
          </Mutation>
        ) : (
          <Loader />
        );
      }}
    </Query>
  );
};

export default SummaryPageLoader;
