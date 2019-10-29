import React from "react";
import { toast } from "../../libs/helpers";
import qs from "qs";
import { useDispatch } from "react-redux";
import * as userActions from "../../domain/user/actions";
import "./styles/signUpStyles.scss";
import { RouteComponentProps } from "react-router";
import { VerifyEmailActionType } from "../../interfaces/actionTypes";

const VerifyEmail: React.FC<RouteComponentProps> = ({ history, location: { search } }) => {
  const dispatch = useDispatch();
  const searchOrg = qs.parse(search.startsWith("?") ? search.slice(1) : search);

  if (!searchOrg.token) {
    toast("Wrong url format, ensure your copypaste link right way");
  }

  const makeVerifyEmail = (): void => {
    if (!searchOrg.token) {
      toast("Wrong url format, ensure your copypaste link right way");
      return;
    }

    dispatch<VerifyEmailActionType>({
      type: userActions.verifyEmail.request,
      payload: { token: searchOrg.token },
      history
    });
  };

  return (
    <section className="verifyEmail">
      <h1>Verify Email</h1>
      <div className="formWrapper">
        <button onClick={makeVerifyEmail}>Verify Email</button>
      </div>
    </section>
  );
};

export default VerifyEmail;
