import * as React from "react";
import { Query } from "react-apollo";
import { GET_USER_GQL } from "../queries/auth";

export const UserContext = React.createContext<{
  refetch: () => void;
  user?: { email: string };
}>({
  refetch: () => {}
});

export function UserContextProvider(props: React.Props<{}>) {
  return (
    <Query query={GET_USER_GQL}>
      {({ loading, error, data, refetch }) => {
        const user = data && data.currentUser;
        return (
          <UserContext.Provider value={{ user, refetch }}>
            {props.children}
          </UserContext.Provider>
        );
      }}
    </Query>
  );
}
