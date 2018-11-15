import * as React from "react";
import { BrowserRouter as Router, Link, Route, Switch } from "react-router-dom";
import { Container, Divider, Header, Menu } from "semantic-ui-react";
import FormCreationPage from "./FormCreationPage";
import FormViewPage from "./FormViewPage";
import LoginForm from "./LoginForm";
import ScoringPage from "./ScoringPage";
import SummaryPage from "./SummaryPage";
import { UserContext } from "./Context";
import Logout from "./Logout";

const Home = () => (
  <Header as="h1" textAlign="center">
    Welcome to ZOW
  </Header>
);

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
              <Link to="/formcreation">Form Creation</Link>
            </Menu.Item>
            <Menu.Item>
              <Link to="/form">Form Viewing</Link>
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
          <Container
            style={{
              backgroundColor: "white",
              borderRadius: "5px",
              padding: "20px"
            }}
          >
            <Switch>
              <Route exact path="/" component={Home} />
              <Route path="/login" component={LoginForm} />
              <Route path="/summary" component={SummaryPage} />
              <Route path="/formcreation" component={FormCreationPage} />
              <Route path="/form" component={FormViewPage} />
              <Route path="/score" component={ScoringPage} />
            </Switch>
          </Container>
          <Divider style={{ minHeight: "50px" }} hidden />
        </div>
      </Router>
    )}
  </UserContext.Consumer>
);

export default AppRouter;
