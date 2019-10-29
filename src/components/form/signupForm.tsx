import React from "react";
import { Field, InjectedFormProps, reduxForm } from "redux-form";
import { FORMS } from "../../constants";

export interface UserCreateInterface {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  password: string;
}

const SignUpForm: React.FunctionComponent<
  InjectedFormProps<UserCreateInterface>
> = ({ handleSubmit }) => {
  return (
    <form onSubmit={handleSubmit}>
      <Field
        name="firstName"
        type="text"
        component="input"
        placeholder="first name"
      />

      <Field
        name="lastName"
        type="text"
        component="input"
        placeholder="last name"
      />

      <Field name="email" type="text" component="input" placeholder="email" />

      <Field
        name="phone"
        type="text"
        component="input"
        placeholder="380991234567"
      />

      <Field
        name="password"
        type="password"
        component="input"
        placeholder="password"
      />

      <div className="submitBtn">
        <button type="submit">Submit</button>
      </div>
    </form>
  );
};

export default reduxForm<UserCreateInterface>({
  form: FORMS.FORM_SIGNUP
})(SignUpForm);
