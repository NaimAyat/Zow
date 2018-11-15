import * as React from "react";
import { BrowserRouter as Router, Link, Route, Switch } from "react-router-dom";
import { Container, Divider, Header, Menu } from "semantic-ui-react";
import FormCreationPage from "./FormCreationPage";
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
      {(document.body.style.backgroundColor = "rgb(63, 131, 198)") && null}
      <Menu fixed="top">
        <Menu.Item>
          <Link to="/">Home</Link>
        </Menu.Item>
        <Menu.Item>
          <Link to="/login">Login</Link>
        </Menu.Item>
        <Menu.Item>
          <Link to="/summary">Summary</Link>
        </Menu.Item>
        <Menu.Item>
          <Link to="/formcreation">Form Creation</Link>
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
        </Switch>
      </Container>
    </div>
  </Router>
);

export default AppRouter;
