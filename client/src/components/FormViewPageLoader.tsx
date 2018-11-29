import * as React from "react";
import FormViewPage from "./FormViewPage";
// import SampleData from "../SampleData";
import { RouteComponentProps } from "react-router";
import { Query } from "react-apollo";
import { GET_FORM_GQL } from "../queries/form";
import { Loader } from "semantic-ui-react";

interface IProps extends RouteComponentProps<{ id: string }> {}

const FormViewPageLoader: React.SFC<IProps> = ({ match }) => {
  return (
    <Query query={GET_FORM_GQL} variables={{ id: match.params.id }}>
      {({ loading, error, data }) => {
        return !loading && !error && data && data.form ? (
          <FormViewPage
            formName={data.form.name}
            questions={data.form.questions}
          />
        ) : (
          <Loader>Loading...</Loader>
        );
      }}
    </Query>
  );
};

export default FormViewPageLoader;
