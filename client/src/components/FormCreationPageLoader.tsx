import * as React from "react";
import { RouteComponentProps } from "react-router";
import FormCreationPage from "./FormCreationPage";

interface IProps extends RouteComponentProps<{ id: string }> {}

const FormViewPageLoader: React.SFC<IProps> = ({ match }) => {
  return <FormCreationPage />;
};

export default FormViewPageLoader;
