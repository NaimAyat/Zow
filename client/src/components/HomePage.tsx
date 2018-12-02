import * as React from "react";
import { Redirect } from "react-router-dom";
import {
  Header,
  Button,
  Grid,
  Loader,
  List,
  Icon,
  Segment,
  Divider,
  GridColumn
} from "semantic-ui-react";
import { UserContext } from "./Context";
import { Mutation, Query } from "react-apollo";
import { NEW_FORM_GQL, OWNED_FORMS_GQL } from "../queries/form";
import { withRouter } from "react-router";
import Page from "./Page";

const HomePage = withRouter((props: any) => (
  <Grid textAlign="center" style={{ height: "100%" }} verticalAlign="middle">
    <UserContext.Consumer>
      {({ user }) => (
        <Mutation mutation={NEW_FORM_GQL}>
          {newForm => {
            const handleNewForm = () => {
              newForm().then(res => {
                if (res && !res.errors) {
                  props.history.push("/form-creation/" + res.data.createForm);
                }
              });
            };

            return (
              <Page header="Welcome to Zow">
                {user ? (
                  <React.Fragment>
                    <Query query={OWNED_FORMS_GQL} fetchPolicy="no-cache">
                      {({ loading, error, data }) => {
                        return !loading && data && data.ownedForms ? (
                          <React.Fragment>
                            <Segment placeholder>
                              <Grid columns={2} stackable textAlign="center">
                                <Divider vertical>Or</Divider>

                                <Grid.Row verticalAlign="middle">
                                  <Grid.Column>
                                    <Header icon>
                                      <Icon name="edit" />
                                      Create New Form
                                    </Header>
                                    <Button
                                      size="large"
                                      primary
                                      onClick={handleNewForm}
                                    >
                                      Create
                                    </Button>
                                  </Grid.Column>

                                  <Grid.Column>
                                    <Header icon>
                                      <Icon name="search" />
                                      Find Form
                                    </Header>
                                    <Grid>
                                      <GridColumn width="2" />
                                      <GridColumn width="12">
                                        <Segment>
                                          <List selection animated size="large">
                                            {data.ownedForms.map(
                                              (form: any, i: number) => (
                                                <List.Item
                                                  key={i}
                                                  onClick={() =>
                                                    props.history.push(
                                                      "/summary/" + form.id
                                                    )
                                                  }
                                                >
                                                  <Icon name="file alternate outline" />
                                                  <List.Content>
                                                    <List.Header>
                                                      {form.name ||
                                                        "Unnamed Form"}
                                                    </List.Header>
                                                  </List.Content>
                                                </List.Item>
                                              )
                                            )}
                                          </List>
                                        </Segment>
                                      </GridColumn>
                                    </Grid>
                                  </Grid.Column>
                                </Grid.Row>
                              </Grid>
                            </Segment>
                          </React.Fragment>
                        ) : (
                          <Loader />
                        );
                      }}
                    </Query>
                  </React.Fragment>
                ) : (
                  <React.Fragment>
                    <Redirect to="/login" />
                  </React.Fragment>
                )}
              </Page>
            );
          }}
        </Mutation>
      )}
    </UserContext.Consumer>
  </Grid>
));

export default HomePage;
