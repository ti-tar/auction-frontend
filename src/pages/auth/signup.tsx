import React from "react";
import "./styles/signUpStyles.scss";
import { Field, reduxForm } from "redux-form";
import { compose } from "redux";
import { connect } from "react-redux";
import * as usersActions from "../../domain/user/actions";
import { withRouter } from "react-router";
import { toast } from "react-toastify";

// interfaces
import userCreateInterface from "../../interfaces/userCreate";

// css
import "./styles/signUpStyles.scss";
import { FORMS } from "../../constants";

type Props = React.ReactChild & {
  handleSubmit: Function;
  createNewUser: Function;
  history: Function;
};

const SignUp: React.FunctionComponent<Props> = props => {
  const { handleSubmit, createNewUser, history } = props;

  const handleBeforeSubmit = (formValues: any) => {
    if (
      !formValues.firstName ||
      !formValues.lastName ||
      !formValues.email ||
      !formValues.password ||
      !formValues.phone
    ) {
      toast.error("fill all fields");
      return false;
    }

    const userToSend: userCreateInterface = {
      firstName: formValues.firstName,
      lastName: formValues.lastName,
      email: formValues.email,
      phone: formValues.phone,
      password: formValues.password
    };

    createNewUser(userToSend, history);
  };

  return (
    <section className="signUp">
      <h1>Sign Up</h1>
      <div className="formWrapper">
        <form onSubmit={handleSubmit(handleBeforeSubmit)}>
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

          <Field
            name="email"
            type="text"
            component="input"
            placeholder="email"
          />

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
      </div>
    </section>
  );
};

const SignUpRouteComponent: any = compose(
  connect(
    null,
    {
      createNewUser: (
        userToSend: userCreateInterface,
        history: Function
      ): any => ({
        type: usersActions.createNewUser.request,
        payload: userToSend,
        history
      })
    }
  ),
  reduxForm({
    form: FORMS.FORM_SIGNUP
  }),
  withRouter
)(SignUp);

export default SignUpRouteComponent;
