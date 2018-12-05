import { Button, Form } from "semantic-ui-react";

export const Login = props => (
  <div className="landing_container">
    <h1 className="login_title">Log In</h1>
    <div className="login_container">
      <Form className="login_form" onSubmit={props.onSubmit}>
        <Form.Input
          label="Email"
          placeholder="Email"
          type="email"
          onChange={props.inputsChange}
          name="email"
          value={props.emailValue}
        />
        <Form.Input
          label="Password"
          placeholder="Password"
          type="password"
          name="password"
          onChange={props.inputsChange}
          value={props.passwordValue}
        />
        <Button className="landing_button">Login</Button>
      </Form>
    </div>
  </div>
);
