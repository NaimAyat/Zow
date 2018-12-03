import * as React from "react";
import { LOGOUT_GQL } from "../queries/auth";
import { Mutation } from "react-apollo";
import { withRouter, RouteComponentProps } from "react-router";
import { Button } from "semantic-ui-react";

interface IProps extends RouteComponentProps<{ id: string }> {
  refetchUser: () => void;
}

const Logout: React.SFC<IProps> = ({ refetchUser, history }) => {
  return (
    <Mutation mutation={LOGOUT_GQL}>
      {(logout, { loading, data, called }) => {
        return (
          <Button
            primary
            content="Logout"
            onClick={() => {
              logout().then(() => {
                refetchUser();
                history.push("/");
              });
            }}
          />
        );
      }}
    </Mutation>
  );
};

export default withRouter(Logout);
