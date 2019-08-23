import React from "react";
import {Field, reduxForm} from "redux-form";
import {toast} from "react-toastify";
import userLoginDataInterface from "../../interfaces/userLoginData";
import {compose} from "redux";
import {connect} from "react-redux";
import * as usersActions from "../../domain/users/actions";
import {withRouter} from "react-router";

// css
import './styles/signUpStyles.scss';

type Props = React.ReactChild & { handleSubmit: Function, makeLogin: Function, history: Function};

const Login: React.FunctionComponent<Props> = (props) => {

	const {handleSubmit, makeLogin, history} = props;

	const handleBeforeSubmit = (formValues: any) => {
		if (!formValues.email || !formValues.password) {
			toast.error('fill all fields');
			return false;
		}

		const loginData: userLoginDataInterface = {
			email: formValues.email,
			password: formValues.password,
		};

		makeLogin(loginData, history);
	};

	return (
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

					<div className="submitBtn">
						<button type="submit">
							Submit
						</button>
					</div>

				</form>
			</div>

		</section>
	);
};

const LoginRouteComponent: any = compose(
	connect(
		null,
		{
			makeLogin: (loginData: userLoginDataInterface, history: Function): any => ({ type: usersActions.login.request, payload: {loginData, history} }),
		}
	),
	reduxForm({
		form: 'form-login',
	}),
	withRouter
) (Login);

export default LoginRouteComponent;
