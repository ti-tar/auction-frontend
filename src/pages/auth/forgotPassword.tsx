import React, { useState } from "react";
import {Field, reduxForm} from "redux-form";
import {toast} from "react-toastify";
import userLoginDataInterface from "../../interfaces/userLoginData";
import {compose} from "redux";
import {connect} from "react-redux";
import * as userActions from "../../domain/user/actions";

// css
import './styles/signUpStyles.scss';
import { withRouter } from "react-router";

const ForgotPassword: any = (props: any): any => {

	const { sendForgotEmail, history } = props;

  const [ email, setEmail ] = useState('');

  const handleInput = (e: any) => {
    setEmail(e.target.value);
  }

	const handleSendForgotEmail = () => {
		sendForgotEmail({ email }, history);
	};

	return (<section className="fogotPassword">
			<h1>Fogot password</h1>

			<div className="formWrapper">
				<form >

					<input
						name="email"
						type="text"
            placeholder="email"
            value={email}
            onChange={handleInput}
					/>

					<div className="submitBtn">
						<button type="button" onClick={handleSendForgotEmail}>
							Submit
						</button>
					</div>

				</form>
			</div>

		</section>);
};

const ForgotPasswordRouteComponent: any = compose(
	connect(
		null,
		{
			sendForgotEmail: (emailData: any, history: any): any => ({ type: userActions.forgotPassword.request, payload: emailData, history }),
		}
  ),
  withRouter,
) (ForgotPassword);

export default ForgotPasswordRouteComponent;
