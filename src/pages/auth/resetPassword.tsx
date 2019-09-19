import React, { useState } from "react";
import { toast } from '../../libs/helpers';
import qs from 'qs';

import {connect} from "react-redux";
import {compose} from "redux";
import * as userActions from "../../domain/user/actions";

// css
import './styles/signUpStyles.scss';
import { withRouter } from "react-router";


const ResetEmail: any = (props: any): any => {

  const { history, resetPassword, location : { search } } = props;

  const [password, setPassword] = useState('');
  const [passwordConfirm, setPasswordConfirm] = useState('');

  const searchOrg = qs.parse(search.startsWith('?') ? search.slice(1) : search);

  if (!searchOrg.token){ 
    toast('Wrong url format, ensure your copypaste link right way');
  }

	const makeResetPassword = () => {

    if (!searchOrg.token){
      toast('Wrong url format, ensure your copypaste link right way');
      return false;
    }  

    resetPassword({
      token: searchOrg.token,
      password,
      passwordConfirm,
    }, history);
	};

	return (
		<section className="resetEmail">
			<h1>Reset Email</h1>

			<div className="formWrapper">
        
      <form >

        <input
          name="password"
          type="text"
          placeholder="password"
          value={password}
          onChange={(e)=> setPassword(e.target.value)}
        />
        
        <input
          name="password_confirm"
          type="text"
          placeholder="password confirm"
          value={passwordConfirm}
          onChange={(e)=> setPasswordConfirm(e.target.value)}
        />
        
        <div className="submitBtn">
          <button type="button" onClick={makeResetPassword}>
            Reset Password
          </button>
        </div>

      </form>

			</div>

		</section>
	);
};

const ResetEmailRouteComponent: any = compose( 
  connect(
    (state: any) => ({
      // isLoading: state.user.isLoading,
    }),
    {
      resetPassword: (resetPassData: any, history: any): any => ({ type: userActions.resetPassword.request, payload: resetPassData, history }),
    }
  ),
  withRouter
)(ResetEmail);


export default ResetEmailRouteComponent;