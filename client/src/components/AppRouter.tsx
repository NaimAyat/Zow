import * as React from "react";
import { BrowserRouter as Router, Link, Route, Switch } from "react-router-dom";
import { Divider, Menu, Image, Header } from "semantic-ui-react";
import FormCreationPageLoader from "./FormCreationPageLoader";
import FormViewPageLoader from "./FormViewPageLoader";
import LoginForm from "./LoginForm";
import ScoringPageLoader from "./ScoringPageLoader";
import SummaryPageLoader from "./SummaryPageLoader";
import { UserContext } from "./Context";
import Logout from "./Logout";
import InterviewSelection from "./InterviewSelection";
import InterviewCreation from "./InterviewCreationPage";
import Registration from "./Registration";
import HomePage from "./HomePage";
import Success from "./Success";
import Failure from "./Failure";
import CowImage from "../images/cow.png";

const AppRouter = () => (
  <UserContext.Consumer>
    {({ user, refetch: refetchUser }) => (
      <Router>
        <div>
          {(document.body.style.backgroundColor = "rgb(47, 72, 88)") && null}
          <Menu fixed="top">
            <Menu.Item>
              <Link to="/">
                <Header icon={CowImage} as="h1">
                  <Image src={CowImage} />
                  <Header.Content>
                    Zow
                    <Header.Subheader>
                      Hassle-free Club Recruiting
                    </Header.Subheader>
                  </Header.Content>
                </Header>
              </Link>
            </Menu.Item>
            <Menu.Item>
              <Link to="/interview-creation">Interview Creation</Link>
            </Menu.Item>
            <Menu.Item>
              <Link to="/interview">Interview Selection</Link>
            </Menu.Item>
            {user && (
              <React.Fragment>
                <Menu.Item position="right">
                  <Header as="h3" icon="user circle" content={user.email} />
                </Menu.Item>
                <Menu.Item>
                  <Logout refetchUser={refetchUser} />
                </Menu.Item>
              </React.Fragment>
            )}
          </Menu>
          <Divider style={{ minHeight: "100px" }} hidden />
          <Switch>
            <Route exact path="/" component={HomePage} />
            <Route path="/login" component={LoginForm} />
            <Route path="/register" component={Registration} />
            <Route path="/form/:id" component={FormViewPageLoader} />
            {user && (
              <React.Fragment>
                <Route path="/summary/:id" component={SummaryPageLoader} />
                <Route
                  path="/form-creation/:id"
                  component={FormCreationPageLoader}
                />
                <Route
                  path="/score/:formid/:responseid"
                  component={ScoringPageLoader}
                />
                <Route
                  path="/interview-creation"
                  component={InterviewCreation}
                />
                <Route path="/interview" component={InterviewSelection} />
                <Route path="/success" component={Success} />
              </React.Fragment>
            )}
            <Route path="/*" component={Failure} />
          </Switch>
          <Divider style={{ minHeight: "50px" }} hidden />
        </div>
      </Router>
    )}
  </UserContext.Consumer>
);

export default AppRouter;
