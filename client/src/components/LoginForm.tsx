import * as React from "react";
import { Button, Form, Grid, Header, Icon, Segment } from "semantic-ui-react";

const LoginForm = () => (
  <div className="login-form">
    {/*
      Heads up! The styles below are necessary for the correct render of this example.
      You can do same with CSS, the main idea is that all the elements up to the `Grid`
      below must have a height of 100%.
    */}
    <style>{`
      body > div,
      body > div > div,
      body > div > div > div.login-form {
        height: 100%;
      }
    `}</style>
    <Grid textAlign="center" style={{ height: "100%" }} verticalAlign="middle">
      <Grid.Column style={{ maxWidth: 450 }}>
        <Header as="h2" color="black" textAlign="center">
          Log in to your account
        </Header>
        <Form size="large">
          <Segment stacked={true}>
            <Form.Input
              fluid={true}
              icon="user"
              iconPosition="left"
              placeholder="Email address"
            />
            <Form.Input
              fluid={true}
              icon="lock"
              iconPosition="left"
              placeholder="Password"
              type="password"
            />

            <Button
              color="black"
              size="large"
              icon={true}
              labelPosition="right"
            >
              Login
              <Icon name="arrow right" />
            </Button>
          </Segment>
          <Segment>
            <Header as="h3">New to Zow?</Header>
            <Button color="blue" size="large" icon={true} labelPosition="right">
              Sign Up
              <Icon name="arrow right" />
            </Button>
          </Segment>
        </Form>
      </Grid.Column>
    </Grid>
  </div>
);

export default LoginForm;
