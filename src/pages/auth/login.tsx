import React from "react";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import * as userActions from "../../domain/user/actions";
import LoginForm, { LoginInterface } from "../../components/form/loginForm";
import { StateInterface } from "../../domain";
import { AuthActionType } from "../../interfaces/actionTypes";
import { RouteComponentProps } from "react-router";

import "./styles/signUpStyles.scss";

const Login: React.FunctionComponent<RouteComponentProps> = ({ history }) => {
  const dispatch = useDispatch();
  const isLoading = useSelector(
    (state: StateInterface) => state.user.isLoading
  );

  const handleBeforeSubmit = (formValues: LoginInterface): void => {
    if (!formValues.email || !formValues.password) {
      toast.error("fill all fields");
      return;
    }

    dispatch<AuthActionType>({
      type: userActions.login.request,
      payload: { loginData: formValues },
      history
    });
  };

  return isLoading ? (
    <h1>isLoading...</h1>
  ) : (
    <section className="login">
      <h1>Login</h1>
      <div className="formWrapper">
        <LoginForm onSubmit={handleBeforeSubmit} />
      </div>
    </section>
  );
};

export default Login;
