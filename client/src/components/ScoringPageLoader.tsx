import * as React from "react";
import ScoringPage from "./ScoringPage";
import { RouteComponentProps } from "react-router";
import { GET_SUMMARY_DATA, SUBMIT_SCORE_GQL } from "../queries/form";
import { Query, Mutation } from "react-apollo";
import { Loader, Message } from "semantic-ui-react";

interface IProps
  extends RouteComponentProps<{ formid: string; responseid: string }> {}

const ScoringPageLoader: React.SFC<IProps> = (props: IProps) => {
  return (
    <Query
      query={GET_SUMMARY_DATA}
      variables={{ id: props.match.params.formid }}
    >
      {({ loading, error, data }) => {
        const toScore = props.match.params.responseid.split(",");
        const responseID = toScore.shift();

        let response: any;
        if (!loading && !error) {
          response = data.form.responses.find(
            (resp: any) => resp.id === responseID
          );
        }
        return loading ? (
          <Loader />
        ) : error || response === undefined ? (
          <Message error>Failed to fetch response</Message>
        ) : (
          <Mutation mutation={SUBMIT_SCORE_GQL}>
            {submitScore => {
              return (
                <ScoringPage
                  formName="My Sample Form"
                  questions={data.form.questions}
                  response={response}
                  onSubmit={async (rating, notes) => {
                    await submitScore({
                      variables: { responseID, score: rating, notes }
                    });
                    if (toScore.length > 0) {
                      props.history.push(
                        "/score/" +
                          props.match.params.formid +
                          "/" +
                          toScore.join(",")
                      );
                    } else {
                      props.history.push(
                        "/summary/" + props.match.params.formid
                      );
                    }
                  }}
                />
              );
            }}
          </Mutation>
        );
      }}
    </Query>
  );
};

export default ScoringPageLoader;
