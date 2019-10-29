import React from "react";
import "./styles/signUpStyles.scss";
import { useDispatch } from "react-redux";
import * as usersActions from "../../domain/user/actions";
import { RouteComponentProps } from "react-router";
import { toast } from "react-toastify";
import SignUpForm, { UserCreateInterface } from "../../components/form/signupForm";

import "./styles/signUpStyles.scss";
import { SignUpActionType } from "../../interfaces/actionTypes";

const SignUp: React.FunctionComponent<RouteComponentProps> = ({ history }) => {
  const dispatch = useDispatch();

  const handleBeforeSubmit = (formValues: UserCreateInterface): void => {
    if (
      !formValues.firstName ||
      !formValues.lastName ||
      !formValues.email ||
      !formValues.password ||
      !formValues.phone
    ) {
      toast.error("fill all fields");
      return;
    }

    dispatch<SignUpActionType>({
      type: usersActions.createNewUser.request,
      payload: { newUser: formValues },
      history
    });
  };

  return (
    <section className="signUp">
      <h1>Sign Up</h1>
      <div className="formWrapper">
        <SignUpForm onSubmit={handleBeforeSubmit} />
      </div>
    </section>
  );
};

export default SignUp;
