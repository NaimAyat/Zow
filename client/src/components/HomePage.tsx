import * as React from "react";
import { Link } from "react-router-dom";
import {
  Header,
  Button,
  Grid,
  Loader,
  List,
  Icon,
  Segment,
  Divider,
  GridColumn,
  Image
} from "semantic-ui-react";
import { UserContext } from "./Context";
import { Mutation, Query } from "react-apollo";
import { NEW_FORM_GQL, OWNED_FORMS_GQL } from "../queries/form";
import { withRouter } from "react-router";
import Page from "./Page";
import GrassImage from "../images/grass.png";
import CowImage from "../images/cow.png";

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
                                                        "[Untitled Form]"}
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
                    <Grid columns={2}>
                      <Grid.Column width={8}>
                        <Header>Powerful for Recruiters</Header>
                        <p>
                          Recruiters can create forms, score submissions,
                          interview candidates, and more. Zow streamlines
                          recruiting for clubs and organizations to make the job
                          as easy as possible.
                        </p>
                        <Header>Simple for Applicants</Header>
                        <p>
                          Forms that are created by recruiters don't need a
                          login to be filled out. This means that a user can
                          submit to the forms without any hassle.
                        </p>
                      </Grid.Column>
                      <Grid.Column width={8}>
                        <Segment placeholder>
                          <Header icon>
                            <Icon name="user circle" />
                            Get started with Zow.
                          </Header>
                          <Link to="/login">
                            <Button primary size="huge">
                              Login
                            </Button>
                          </Link>
                        </Segment>
                      </Grid.Column>
                    </Grid>
                  </React.Fragment>
                )}
              </Page>
              <Page header="How does it work?">
                <Grid columns={2}>
                  <Grid.Column width={12}>
                    <p>
                      Zow allows recruiters to create postings for their open
                      positions. You can make custom forms to collect all of the
                      data they need to screen candidates. In addition to that,
                      student organizations can score each applicant and see the
                      overall score ranking from the lowest to highest or vice
                      versa. This way, student organizations can easily
                      distinguish between strong and weak candidates. Therefore,
                      the sorting process can be done in much less time.
                      Recruiters can automatically schedule interviews, and go
                      through multiple rounds of scoring, so that they can
                      easily get to a final decision. Lastly, there is also a
                      summary view that lets you see the overall statistics for
                      your applicant pool, allowing you to identify trends in
                      candidates.
                    </p>
                    <p>
                      Whether you're an applicant or recruiter, Zow makes it
                      easy to be a part of fantastic clubs and organizations.
                      With Zow, you'll be able to recruit simply and easily. If
                      you're an applicant, Zow's streamlined interface will make
                      sure you present the best version of youself.
                    </p>
                    <p>
                      Ultimately, Zow is a powerful tool that allows you to
                      screen candidates and find the best people for you
                      organization. Zow will make you say ZWOW!
                    </p>
                  </Grid.Column>
                  <Grid.Column width={4}>
                    <Image src={CowImage} />
                  </Grid.Column>
                </Grid>
                <Image src={GrassImage} />
              </Page>
            </React.Fragment>
          );
        }}
      </Mutation>
    )}
  </UserContext.Consumer>
));

export default HomePage;
