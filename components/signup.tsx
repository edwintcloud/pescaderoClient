import { Button, Form } from "semantic-ui-react";

export const Signup = props => (
  <div className="landing_container">
    <h1 className="signup_title">Sign Up</h1>
    <div className="signup_container">
      <Form className="signup_form" onSubmit={props.onSubmit}>
      <Form.Group widths='equal'>
        <Form.Input
          label="First Name"
          placeholder="First Name"
          type="text"
          onChange={props.inputsChange}
          name="firstName"
          value={props.firstNameValue}
        />
        <Form.Input
          label="Last Name"
          placeholder="Last Name"
          type="text"
          onChange={props.inputsChange}
          name="lastName"
          value={props.lastNameValue}
        />
        </Form.Group>
        <Form.Input
          label="Email"
          placeholder="Email"
          type="email"
          onChange={props.inputsChange}
          name="email"
          value={props.emailValue}
          error={props.emailInvalid}
        />
        <Form.Input
          label="Password"
          placeholder="Password"
          type="password"
          name="password"
          onChange={props.inputsChange}
          value={props.passwordValue}
          error={props.passwordInvalid}
        />
        <Form.Input
          label="Confirm Password"
          placeholder="Confirm Password"
          type="password"
          name="confirmPassword"
          onChange={props.inputsChange}
          value={props.confirmPasswordValue}
          error={props.confirmPasswordInvalid}
        />
        <Form.Select
          label="City"
          onChange={props.inputsChange}
          name="city"
          options={props.cityOptions}
          defaultValue={props.cityOptions[0].value}
        />
        <Button className="landing_button">Sign Up</Button>
      </Form>
    </div>
  </div>
);
