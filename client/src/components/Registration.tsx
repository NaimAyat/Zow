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
import { NEW_USER_GQL } from "../queries/auth";

interface IProps {
  history: History;
}

interface IState {
  name: string;
  email: string;
  password: string;
}

class Registration extends React.Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);
    this.state = { name: "", email: "", password: "" };
    this.handleChangeEmail = this.handleChangeEmail.bind(this);
    this.handleChangePassword = this.handleChangePassword.bind(this);
    this.handleChangeName = this.handleChangeName.bind(this);
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
            <Mutation mutation={NEW_USER_GQL}>
              {(newUser, { loading, data, called }) => {
                let error = "";

                if (called && !loading) {
                  if (data && data.newUser) {
                    // successful login
                    refetchUser();
                    this.props.history.push("/");
                  } else {
                    if (
                      !this.state.name ||
                      !this.state.email ||
                      !this.state.password
                    ) {
                      error = "Must fill out all fields";
                    } else {
                      error = "User already exists";
                    }
                  }
                }

                return (
                  <Grid.Column style={{ maxWidth: 450 }}>
                    <Header as="h2" textAlign="center">
                      Create your new account with Zow
                    </Header>
                    <Form
                      size="large"
                      onSubmit={() =>
                        newUser({
                          variables: {
                            name: this.state.name,
                            email: this.state.email,
                            password: this.state.password
                          }
                        })
                      }
                      error={!!error}
                    >
                      {error && <Message error content={error} />}
                      <Segment stacked>
                        <Form.Input
                          fluid
                          icon="user"
                          iconPosition="left"
                          placeholder="Name"
                          value={this.state.name}
                          onChange={this.handleChangeName}
                        />
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
                          <Button.Content visible>
                            Create Account
                          </Button.Content>
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

  private handleChangeName(
    event: React.ChangeEvent,
    { value }: InputOnChangeData
  ) {
    this.setState({ name: value });
  }
}

export default Registration;
