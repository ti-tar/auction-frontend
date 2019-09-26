import React from "react";
import { toast } from "../../libs/helpers";
import qs from "qs";
import { connect } from "react-redux";
import * as userActions from "../../domain/user/actions";

// css
import "./styles/signUpStyles.scss";

type Props = React.ReactChild & {
  verifyEmail: Function;
  history: Function;
  location: Record<string, any>;
};

// const VerifyEmail: React.FunctionComponent<Props> = (props) => {
const VerifyEmail: any = (props: any): any => {
  const {
    history,
    verifyEmail,
    location: { search }
  } = props;

  const searchOrg = qs.parse(search.startsWith("?") ? search.slice(1) : search);

  if (!searchOrg.token) {
    toast("Wrong url format, ensure your copypaste link right way");
  }

  const makeVerifyEmail = (formValues: any) => {
    if (!searchOrg.token) {
      toast("Wrong url format, ensure your copypaste link right way");
      return false;
    }

    verifyEmail(searchOrg.token, history);
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

const VerifyEmailRouteComponent: any = connect(
  (state: any) => ({
    // isLoading: state.user.isLoading,
  }),
  {
    verifyEmail: (token: string, history: any): any => ({
      type: userActions.verifyEmail.request,
      payload: { token },
      history
    })
  }
)(VerifyEmail);

export default VerifyEmailRouteComponent;
