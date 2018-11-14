import * as React from "react";
import { LOGOUT_GQL } from "../queries/auth";
import { Mutation } from "react-apollo";

function Logout(props: { refetchUser: () => void }) {
  return (
    <Mutation mutation={LOGOUT_GQL}>
      {(logout, { loading, data, called }) => {
        return (
          <a
            href="#"
            onClick={() => {
              logout().then(() => props.refetchUser());
            }}
          >
            Logout
          </a>
        );
      }}
    </Mutation>
  );
}

export default Logout;
