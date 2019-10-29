import React, { useState } from "react";
import { toast } from "../../libs/helpers";
import qs from "qs";
import { useDispatch } from "react-redux";
import * as userActions from "../../domain/user/actions";
import { RouteComponentProps } from "react-router";

import "./styles/signUpStyles.scss";

import { ResetPasswordActionType } from "../../interfaces/actionTypes";

interface Props {}

const ResetEmail: React.FC<Props & RouteComponentProps> = ({ history, location: { search } }) => {
  const dispatch = useDispatch();
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");

  const searchOrg = qs.parse(search.startsWith("?") ? search.slice(1) : search);

  if (!searchOrg.token) {
    toast("Wrong url format, ensure your copypaste link right way");
  }

  const makeResetPassword = () => {
    if (!searchOrg.token) {
      toast("Wrong url format, ensure your copypaste link right way");
      return false;
    }

    dispatch<ResetPasswordActionType>({
      type: userActions.resetPassword.request,
      payload: {
        token: searchOrg.token,
        password,
        passwordConfirm
      },
      history
    });
  };

  return (
    <section className="resetEmail">
      <h1>Reset Email</h1>

      <div className="formWrapper">
        <form>
          <input
            name="password"
            type="text"
            placeholder="password"
            value={password}
            onChange={e => setPassword(e.target.value)}
          />

          <input
            name="password_confirm"
            type="text"
            placeholder="password confirm"
            value={passwordConfirm}
            onChange={e => setPasswordConfirm(e.target.value)}
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

export default ResetEmail;
