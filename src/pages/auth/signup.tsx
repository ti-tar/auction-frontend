import React from "react";
import './styles/signUpStyles.scss';
import {Field, reduxForm} from "redux-form";
import {compose} from "redux";
import {connect} from "react-redux";
import * as usersActions from "../../domain/users/actions";
import {withRouter} from "react-router";

// interfaces
import userCreateInterface from "../../interfaces/userCreate";
import {toast} from "react-toastify";
import LotCreateInterface from "../../interfaces/lotCreate";

type Props = React.ReactChild & { handleSubmit: Function, createNewUser: Function, history: Function};

const SignUp: React.FunctionComponent<Props> = (props) => {
	const {handleSubmit, createNewUser, history} = props;

	const handleBeforeSubmit = (formValues: any) => {
		if (!formValues.firstName || !formValues.lastName || !formValues.email || !formValues.password) {
			toast.error('fill all fields');
			return false;
		}

		const userToSend: userCreateInterface = {
			firstName: formValues.firstName,
			lastName: formValues.lastName,
			email: formValues.email,
			password: formValues.password,
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

const SignUpRouteComponent: any = compose(
	connect(
		null,
		{
			createNewUser: (userToSend: userCreateInterface, history: Function): any => ({ type: usersActions.createNewUser.request, payload: userToSend, history }),
		}
	),
	reduxForm({
		form: 'form-lots-create',
	}),
	withRouter
) (SignUp);

export default SignUpRouteComponent;
