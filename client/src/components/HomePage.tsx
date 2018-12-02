import * as React from "react";
import { Link } from "react-router-dom";
import { Header, Button, Grid, Loader, List } from "semantic-ui-react";
import { UserContext } from "./Context";
import { Mutation, Query } from "react-apollo";
import { NEW_FORM_GQL, OWNED_FORMS_GQL } from "src/queries/form";
import { withRouter } from "react-router";

const HomePage = withRouter((props: any) => (
  <Grid textAlign="center" verticalAlign="middle" divided='vertically'
  style={{
    height: "100%",
    paddingTop: '80px',
    }}>
    <Grid.Row>
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
              <Header textAlign="center"
              style={{
                color: 'white',
                fontSize: '60px',
              }}>
                ZOW
                <br />
                <p style={{
                  color: 'white',
                  fontSize: '20px',
                }}>Hassle Free Club Recruiting</p>
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
      </Grid.Row>
      <Grid.Row style={{
        height: "50%",
        backgroundColor: "white",
        }}>
        <div>
    <Grid columns={2} padded style={{
      paddingLeft: '50px',
      paddingRight: '100px',
      }}>
      <Grid.Column style={{
        paddingTop: '100px',
        fontStyle: 'Sans-serif',
        fontSize: '17px',
      }}>
      <p style={{
        fontSize: '20px',
        fontStyle: 'bold',
      }}><b>Our Mission</b></p>
        <p> Provide a streamlined, centralized, and secure platform
        for the student organization recruiting process.</p>
      </Grid.Column>
      <Grid.Column style={{
        paddingTop: '50px',
        paddingLeft: '200px',
        paddingBottom: '50px'}}>
      <img src={require('/usr/src/app/src/images/cow.png')}
      style={{width: 250, height: 250,}}/>
      </Grid.Column>
    </Grid>
  </div>
      </Grid.Row>
      <Grid.Row style={{
        height: "15%",
        //backgroundColor: 'rgb(242, 135, 15)',
        backgroundColor: 'skyblue',
      }}>
      <img src={require('/usr/src/app/src/images/footer.png')} style={{
        bottom: 0,
        flex: 1,
        height: '100%',
        left: 0,
        position: 'absolute',
        right: 0,
        top: 0,
        width: '100%'
      }}/>
      </Grid.Row>
  </Grid>

));

export default HomePage;
