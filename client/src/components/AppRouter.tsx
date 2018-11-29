import * as React from "react";
import { BrowserRouter as Router, Link, Route, Switch } from "react-router-dom";
import { Divider, Header, Menu, Button } from "semantic-ui-react";
import FormCreationPage from "./FormCreationPage";
import FormViewPageLoader from "./FormViewPageLoader";
import LoginForm from "./LoginForm";
import ScoringPageLoader from "./ScoringPageLoader";
import SummaryPage from "./SummaryPage";
import { UserContext } from "./Context";
import Logout from "./Logout";
import InterviewSelection from "./InterviewSelection";
import InterviewCreation from "./InterviewCreationPage";
import { Mutation } from "react-apollo";
import { NEW_FORM_GQL } from "src/queries/form";
import { withRouter } from "react-router";

const Home = withRouter((props: any) => (
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
              {user && <Button onClick={handleNewForm}>Create New Form</Button>}
            </Header>
          );
        }}
      </Mutation>
    )}
  </UserContext.Consumer>
));

const AppRouter = () => (
  <UserContext.Consumer>
    {({ user, refetch: refetchUser }) => (
      <Router>
        <div>
          {(document.body.style.backgroundColor = "rgb(47, 72, 88)") && null}
          <Menu fixed="top">
            <Menu.Item>
              <Link to="/">Home</Link>
            </Menu.Item>
            <Menu.Item>
              <Link to="/summary">Summary</Link>
            </Menu.Item>
            <Menu.Item>
              <Link to="/score">Scoring Page</Link>
            </Menu.Item>
            <Menu.Item>
              <Link to="/form">Form Viewing</Link>
            </Menu.Item>
            <Menu.Item>
              <Link to="/interview-creation">Interview Creation</Link>
            </Menu.Item>
            <Menu.Item>
              <Link to="/interview">Interview Selection</Link>
            </Menu.Item>
            <Menu.Item position="right">
              {user ? (
                <span>
                  {user.email}
                  <br />
                  <Logout refetchUser={refetchUser} />
                </span>
              ) : (
                <Link to="/login">Login</Link>
              )}
            </Menu.Item>
          </Menu>
          <Divider style={{ minHeight: "50px" }} hidden />
          <Switch>
            <Route exact path="/" component={Home} />
            <Route path="/login" component={LoginForm} />
            <Route path="/form/:id" component={FormViewPageLoader} />
            {user && (
              <React.Fragment>
                <Route path="/summary" component={SummaryPage} />
                <Route path="/form-creation/:id" component={FormCreationPage} />
                <Route path="/score" component={ScoringPageLoader} />
                <Route
                  path="/interview-creation"
                  component={InterviewCreation}
                />
                <Route path="/interview" component={InterviewSelection} />
              </React.Fragment>
            )}
          </Switch>
          <Divider style={{ minHeight: "50px" }} hidden />
        </div>
      </Router>
    )}
  </UserContext.Consumer>
);

export default AppRouter;
