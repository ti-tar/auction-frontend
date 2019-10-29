import React, { useState } from "react";
import { useDispatch } from "react-redux";
import * as userActions from "../../domain/user/actions";
import "./styles/signUpStyles.scss";
import { RouteComponentProps } from "react-router";
import { ForgotPasswordActionType } from "../../interfaces/actionTypes";

const ForgotPassword: React.FC<RouteComponentProps> = ({ history }): any => {
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");

  const handleInput = (e: any) => {
    setEmail(e.target.value);
  };

  const handleSendForgotEmail = () => {
    dispatch<ForgotPasswordActionType>({
      type: userActions.forgotPassword.request,
      payload: { email },
      history
    });
  };

  return (
    <section className="forgotPassword">
      <h1>Fogot password</h1>

      <div className="formWrapper">
        <form>
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
    </section>
  );
};

export default ForgotPassword;
