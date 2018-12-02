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
            <React.Fragment>
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
              <Page header="How does it work?">
                <p>
                  Zow allows recruiters to create postings for their open
                  positions. You can make custom forms to collect all of the
                  data they need to screen candidates. In addition to that,
                  student organizations can score each applicant and see the
                  overall score ranking from the lowest to highest or vice
                  versa. This way, student organizations can easily distinguish
                  between strong and weak candidates. Therefore, the sorting
                  process can be done in much less time. Recruiters can
                  automatically schedule interviews, and go through multiple
                  rounds of scoring, so that they can easily get to a final
                  decision. Lastly, there is also a summary view that lets you
                  see the overall statistics for your applicant pool, allowing
                  you to identify trends in candidates.
                </p>
                <p>
                  Ultimately, Zow is a powerful tool that allows you to screen
                  candidates and find the best people for you organization. Zow
                  will make you say ZWOW!
                </p>
              </Page>
            </React.Fragment>
          );
        }}
      </Mutation>
    )}
  </UserContext.Consumer>
));

export default HomePage;
