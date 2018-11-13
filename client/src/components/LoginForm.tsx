import * as React from "react";
import { Button, Form, Grid, Header, Icon, Segment } from "semantic-ui-react";
import "../css/LoginForm.css";

const LoginForm = () => (
  <div className="login-form">
    <Grid textAlign="center" style={{ height: "100%" }} verticalAlign="middle">
      <Grid.Column style={{ maxWidth: 450 }}>
        <Header as="h2" textAlign="center">
          Log in to your account
        </Header>
        <Form size="large">
          <Segment stacked>
            <Form.Input
              fluid
              icon="user"
              iconPosition="left"
              placeholder="Email address"
            />
            <Form.Input
              fluid
              icon="lock"
              iconPosition="left"
              placeholder="Password"
              type="password"
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
    </Grid>
  </div>
);

export default LoginForm;
