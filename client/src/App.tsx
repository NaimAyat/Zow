import ApolloClient from "apollo-boost";
import * as React from "react";
import { ApolloProvider } from "react-apollo";

import "semantic-ui-css/semantic.min.css";
import "./index.css";

import { UserContextProvider } from "./components/Context";
import AppRouter from "./components/AppRouter";

const client = new ApolloClient({
  uri: "/api/gql"
});

const App = () => (
  <ApolloProvider client={client}>
    <UserContextProvider>
      <AppRouter />
    </UserContextProvider>
  </ApolloProvider>
);

export default App;
