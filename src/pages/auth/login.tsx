import React from "react";
import { Field, reduxForm } from "redux-form";
import { toast } from "react-toastify";
import userLoginDataInterface from "../../interfaces/userLoginData";
import { compose } from "redux";
import { connect } from "react-redux";
import * as userActions from "../../domain/user/actions";
import { withRouter } from "react-router";

// css
import "./styles/signUpStyles.scss";
import { Link } from "react-router-dom";

type Props = React.ReactChild & {
  handleSubmit: Function;
  makeLogin: Function;
  history: Function;
  isLoading: boolean;
};

const Login: React.FunctionComponent<Props> = props => {
  const { handleSubmit, makeLogin, history, isLoading } = props;

  const handleBeforeSubmit = (formValues: any) => {
    if (!formValues.email || !formValues.password) {
      toast.error("fill all fields");
      return false;
    }

    const loginData: userLoginDataInterface = {
      email: formValues.email,
      password: formValues.password
    };

    makeLogin(loginData, history);
  };

  return isLoading ? (
    <h1>isLoading...</h1>
  ) : (
    <section className="login">
      <h1>Login</h1>

      <div className="formWrapper">
        <form onSubmit={handleSubmit(handleBeforeSubmit)}>
          <Field
            name="email"
            type="text"
            component="input"
            placeholder="email"
          />

          <Field
            name="password"
            type="password"
            component="input"
            placeholder="password"
          />
          <div
            style={{ width: "100%", textAlign: "right", marginBottom: "1em" }}
          >
            <Link to={{ pathname: "/auth/forgot_password" }}>
              forgot password
            </Link>
          </div>

          <div className="submitBtn">
            <button type="submit">Submit</button>
          </div>
        </form>
      </div>
    </section>
  );
};

const LoginRouteComponent: any = compose(
  connect(
    (state: any) => ({
      isLoading: state.user.isLoading
    }),
    {
      makeLogin: (loginData: userLoginDataInterface, history: any): any => ({
        type: userActions.login.request,
        payload: { loginData },
        history
      })
    }
  ),
  reduxForm({
    form: "form-login"
  }),
  withRouter
)(Login);

export default LoginRouteComponent;
