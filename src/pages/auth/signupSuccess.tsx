import React from "react";
import './styles/signUpStyles.scss';
import './styles/signUpStyles.scss';

export default (props: any) => {
	return (
		<section className="signUp">
			<h1>Sign Up</h1>
			<div className="formWrapper">
        <h1>Thank You for Signing Up!</h1>
        <h1>Check the confirmation email</h1>
        <p>Note: If you do not receive the email in few minutes:</p>
        
        <ul>
          <li>check spam folder</li>
          <li>verify if you typed your email correctly</li>
        </ul>
			</div>
		</section>
	);
};
