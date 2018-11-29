import * as React from "react";
import {
  Button,
  Form,
  Grid,
  Header,
  Icon,
  Segment,
  InputOnChangeData,
  Message
} from "semantic-ui-react";
import "../css/LoginForm.css";
import { Mutation } from "react-apollo";
import { History } from "history";
import { UserContext } from "./Context";
import { LOGIN_GQL } from "../queries/auth";

interface IProps {
  history: History;
}

interface IState {
  email: string;
  password: string;
}

class LoginForm extends React.Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);
    this.state = { email: "", password: "" };
    this.handleChangeEmail = this.handleChangeEmail.bind(this);
    this.handleChangePassword = this.handleChangePassword.bind(this);
  }

  public render() {
    return (
      <UserContext.Consumer>
        {({ user, refetch: refetchUser }) => (
          <Grid
            textAlign="center"
            style={{ height: "100%" }}
            verticalAlign="middle"
          >
            <Mutation mutation={LOGIN_GQL}>
              {(login, { loading, data, called }) => {
                let error = "";

                if (called && !loading) {
                  if (data && data.login) {
                    // successful login
                    refetchUser();
                    this.props.history.push("/summary");
                  } else {
                    error = "Invalid login";
                  }
                }

                return (
                  <Grid.Column style={{ maxWidth: 450 }}>
                    <Header as="h2" textAlign="center">
                      Log in to your account
                    </Header>
                    <Form
                      size="large"
                      onSubmit={() =>
                        login({
                          variables: {
                            email: this.state.email,
                            password: this.state.password
                          }
                        })
                      }
                      error={!!error}
                    >
                      {error && <Message error content="Invalid Login" />}
                      <Segment stacked>
                        <Form.Input
                          fluid
                          icon="user"
                          iconPosition="left"
                          placeholder="Email address"
                          value={this.state.email}
                          onChange={this.handleChangeEmail}
                        />
                        <Form.Input
                          fluid
                          icon="lock"
                          iconPosition="left"
                          placeholder="Password"
                          type="password"
                          value={this.state.password}
                          onChange={this.handleChangePassword}
                        />

                        <Button primary size="large" animated>
                          <Button.Content visible>Login</Button.Content>
                          <Button.Content hidden>
                            <Icon name="arrow right" />
                          </Button.Content>
                        </Button>
                      </Segment>
                      <Segment style={{ margin: "auto", maxWidth: 200 }}>
                        <Header as="h3">New to Zow?</Header>
                        <Button secondary size="large" animated>
                          <Button.Content visible>Sign Up</Button.Content>
                          <Button.Content hidden>
                            <Icon name="arrow right" />
                          </Button.Content>
                        </Button>
                      </Segment>
                    </Form>
                  </Grid.Column>
                );
              }}
            </Mutation>
          </Grid>
        )}
      </UserContext.Consumer>
    );
  }

  private handleChangeEmail(
    event: React.ChangeEvent,
    { value }: InputOnChangeData
  ) {
    this.setState({ email: value });
  }

  private handleChangePassword(
    event: React.ChangeEvent,
    { value }: InputOnChangeData
  ) {
    this.setState({ password: value });
  }
}

export default LoginForm;
