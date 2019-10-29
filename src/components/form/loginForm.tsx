import React from "react";
import { Field, InjectedFormProps, reduxForm } from "redux-form";
import { Link } from "react-router-dom";
import { FORMS } from "../../constants";

export interface LoginInterface {
  email: string;
  password: string;
}

const LoginForm: React.FunctionComponent<InjectedFormProps<LoginInterface>> = ({
  handleSubmit
}) => {
  return (
    <form onSubmit={handleSubmit}>
      <Field name="email" type="text" component="input" placeholder="email" />
      <Field
        name="password"
        type="password"
        component="input"
        placeholder="password"
      />
      <div style={{ width: "100%", textAlign: "right", marginBottom: "1em" }}>
        <Link to={{ pathname: "/auth/forgot_password" }}>forgot password</Link>
      </div>

      <div className="submitBtn">
        <button type="submit">Submit</button>
      </div>
    </form>
  );
};

export default reduxForm<LoginInterface>({ form: FORMS.FORM_LOGIN })(LoginForm);
