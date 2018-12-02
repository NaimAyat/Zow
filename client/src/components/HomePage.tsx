import * as React from "react";
import { Link } from "react-router-dom";
import { Header, Button, Grid, Loader, List } from "semantic-ui-react";
import { UserContext } from "./Context";
import { Mutation, Query } from "react-apollo";
import { NEW_FORM_GQL, OWNED_FORMS_GQL } from "../queries/form";
import { withRouter } from "react-router";

const HomePage = withRouter((props: any) => (
  <Grid textAlign="center" style={{ height: "100%" }} verticalAlign="middle">
    <UserContext.Consumer>
      {({ user }) => (
        <Mutation mutation={NEW_FORM_GQL}>
          {newForm => {
            const handleNewForm = () => {
              newForm()
                .then(res => {
                  console.log(res);
                  if (res && !res.errors) {
                    props.history.push("/form-creation/" + res.data.createForm);
                  }
                })
                .catch(console.error);
            };

            return (
              <Header as="h1" textAlign="center">
                Welcome to ZOW
                <br />
                {user ? (
                  <React.Fragment>
                    <Button onClick={handleNewForm}>Create New Form</Button>
                    <br />
                    <Query query={OWNED_FORMS_GQL} fetchPolicy="no-cache">
                      {({ loading, error, data }) => {
                        console.log(
                          "Fetching owned forms",
                          loading,
                          error,
                          data,
                          !loading && data && data.ownedForms
                        );
                        if (error) console.error(error);
                        return !loading && data && data.ownedForms ? (
                          <React.Fragment>
                            <Header as="h1">My Forms:</Header>
                            <List>
                              {data.ownedForms.map((form: any, i: number) => (
                                <List.Item key={i}>
                                  <Link to={"/summary/" + form.id}>
                                    {form.name}
                                  </Link>
                                </List.Item>
                              ))}
                            </List>
                          </React.Fragment>
                        ) : (
                          <Loader />
                        );
                      }}
                    </Query>
                  </React.Fragment>
                ) : (
                  <React.Fragment>
                    <Link to="/login">
                      <Button primary>Login</Button>
                    </Link>
                    <br />
                    <Link to="/register">
                      <Button secondary>Sign Up</Button>
                    </Link>
                  </React.Fragment>
                )}
              </Header>
            );
          }}
        </Mutation>
      )}
    </UserContext.Consumer>
  </Grid>
));

export default HomePage;
