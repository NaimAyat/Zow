import * as React from "react";
import { BrowserRouter as Router, Link, Route, Switch } from "react-router-dom";
import { Divider, Header, Menu } from "semantic-ui-react";
import FormCreationPage from "./FormCreationPage";
import FormViewPageLoader from "./FormViewPageLoader";
import LoginForm from "./LoginForm";
import ScoringPageLoader from "./ScoringPageLoader";
import SummaryPage from "./SummaryPage";
import { UserContext } from "./Context";
import Logout from "./Logout";
import InterviewSelection from "./InterviewSelection";

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
              <Link to="/form-creation">Form Creation</Link>
            </Menu.Item>
            <Menu.Item>
              <Link to="/form">Form Viewing</Link>
            </Menu.Item>
            <Menu.Item>
              <Link to="/interview-selection">Interview Selection</Link>
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
            <Route path="/summary" component={SummaryPage} />
            <Route path="/form-creation" component={FormCreationPage} />
            <Route path="/form" component={FormViewPageLoader} />
            <Route path="/score" component={ScoringPageLoader} />
            <Route path="/interview-selection" component={InterviewSelection} />
          </Switch>
          <Divider style={{ minHeight: "50px" }} hidden />
        </div>
      </Router>
    )}
  </UserContext.Consumer>
);

export default AppRouter;
