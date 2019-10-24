import React, { useEffect } from "react";
import { Switch, Route } from "react-router-dom";
import { useDispatch } from "react-redux";

import Main from "./pages/main";
import ForgotPassword from "./pages/auth/forgotPassword";
import ResetPassword from "./pages/auth/resetPassword";
import VerifyEmail from "./pages/auth/verifyEmail";
import Login from "./pages/auth/login";
import SignUp from "./pages/auth/signup";
import SignUpSuccess from "./pages/auth/signupSuccess";
import Lots from "./pages/lots/lots";
import LotsEdit from "./pages/lots/lotsEdit";
import LotsDetails from "./pages/lots/lotDetails";
import BidCreate from "./pages/bids/bidCreate";

import Orders from "./pages/orders/orders";
import OrderEdit from "./pages/orders/orderEdit";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// components
import NanMenu from "./components/navmenu/navmenu";
import SocketIO from "./components/socketio/socketIO";
import { getStorageItem } from "./libs/storage";

import * as userActions from "./domain/user/actions";
import "./App.css";

const App: React.FC = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const id = parseInt(getStorageItem("id"), 10);
    const token = getStorageItem("token");
    const email = getStorageItem("email");
    const firstName = getStorageItem("firstName");

    if (!!id && !!email && !!token && !!firstName) {
      dispatch({
        type: userActions.setUserFromLocalStorage.request,
        payload: { id, email, token, firstName }
      });
    }
  }, [dispatch]);

  return (
    <div className="App">
      <ToastContainer />

      <NanMenu />

      <SocketIO />

      <Switch>
        <Route exact path="/auth/forgot_password" component={ForgotPassword} />
        <Route exact path="/auth/reset_email" component={ResetPassword} />
        <Route exact path="/auth/verify/email" component={VerifyEmail} />
        <Route exact path="/auth/login" component={Login} />
        <Route exact path="/auth/signup" component={SignUp} />
        <Route exact path="/auth/signup/success" component={SignUpSuccess} />

        <Route exact path="/lots/:lotId/edit" component={LotsEdit} />
        <Route exact path="/lots/create" component={LotsEdit} />

        <Route exact path="/lots/own/lots" component={Lots} />
        <Route exact path="/lots/own/bids" component={Lots} />
        <Route exact path="/lots/:lotId/make_bid" component={BidCreate} />
        <Route exact path="/lots/:id" component={LotsDetails} />
        <Route exact path="/lots" component={Lots} />
        <Route exact path="/lots/:lotId/order" component={OrderEdit} />
        <Route exact path="/orders" component={Orders} />
        <Route exact path="/" component={Main} />
      </Switch>
    </div>
  );
};

export default App;
