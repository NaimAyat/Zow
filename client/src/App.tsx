import ApolloClient, { gql } from "apollo-boost";
import * as React from "react";
import { ApolloProvider, Query } from "react-apollo";

const client = new ApolloClient({
  uri: "/api/gql"
});

const App = () => (
  <ApolloProvider client={client}>
    <Query
      query={gql`
        {
          hello
          time
        }
      `}
      pollInterval={1000}
    >
      {({ loading, error, data }) => {
        if (loading) {
          return <p>Loading...</p>;
        }
        if (error) {
          return <p>Error: {error.message}</p>;
        }

        return <p>The time is: {data.time}</p>;
      }}
    </Query>
  </ApolloProvider>
);

export default App;
