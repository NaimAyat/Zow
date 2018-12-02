import * as React from "react";
import FormViewPage from "./FormViewPage";
import { RouteComponentProps } from "react-router";
import { Query, Mutation } from "react-apollo";
import { GET_FORM_GQL, ADD_RESPONSE_GQL } from "../queries/form";
import { Loader } from "semantic-ui-react";

interface IProps extends RouteComponentProps<{ id: string }> {}

const FormViewPageLoader: React.SFC<IProps> = props => {
  return (
    <Query query={GET_FORM_GQL} variables={{ id: props.match.params.id }}>
      {({ loading, error, data }) => {
        return !loading && !error && data && data.form ? (
          <Mutation mutation={ADD_RESPONSE_GQL}>
            {addResponse => {
              return (
                <FormViewPage
                  formName={data.form.name}
                  questions={data.form.questions}
                  onSubmit={async response => {
                    await addResponse({
                      variables: {
                        formID: props.match.params.id,
                        email: response.email,
                        answers: response.answers.map(({ answer }) => answer)
                      }
                    });
                    props.history.push("/success");
                  }}
                />
              );
            }}
          </Mutation>
        ) : (
          <Loader>Loading...</Loader>
        );
      }}
    </Query>
  );
};

export default FormViewPageLoader;
