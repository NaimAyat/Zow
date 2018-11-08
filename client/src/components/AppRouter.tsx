import * as React from "react";
import { BrowserRouter as Router, Link, Route, Switch } from "react-router-dom";
import { Header, Menu } from "semantic-ui-react";
import LoginForm from "./LoginForm";
import SummaryPage from "./SummaryPage";

const Home = () => (
  <Header as="h1" textAlign="center">
    Home
  </Header>
);

const AppRouter = () => (
  <Router>
    <div>
      <Menu>
        <Menu.Item>
          <Link to="/">Home</Link>
        </Menu.Item>
        <Menu.Item>
          <Link to="/login">Login</Link>
        </Menu.Item>
        <Menu.Item>
          <Link to="/summary">Summary</Link>
        </Menu.Item>
      </Menu>
      <Switch>
        <Route exact path="/" component={Home} />
        <Route path="/login" component={LoginForm} />
        <Route path="/summary" component={SummaryPage} />
      </Switch>
    </div>
  </Router>
);

export default AppRouter;
