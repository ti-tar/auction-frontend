import React, { useEffect } from 'react';
import { connect } from 'react-redux';
// actions
import * as userActions from "./domain/user/actions";
// csd
import './App.css';
// pages
import Main from './pages/main';

import ForgotPassword from './pages/auth/forgotPassword';
import ResetPassword from './pages/auth/resetPassword';
import VerifyEmail from './pages/auth/verifyEmail';
import Login from './pages/auth/login';
import SignUp from './pages/auth/signup';
import SignUpSuccess from './pages/auth/signupSuccess';

import Lots from './pages/lots/lots';
import LotsEdit from './pages/lots/lotsEdit';
import LotsDetails from './pages/lots/lotDetails';

import BidCreate from './pages/bids/bidCreate';

// declare toasts
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// components
import NanMenu from './components/navmenu/navmenu';
import SocketIO from './components/socketio/socketIO';
import { Switch, Route } from 'react-router-dom';
import { getStorageItem } from "./libs/storage";



const App: React.FC = (props: any) => {

	const { setUserFromLocalStorage } = props;

	useEffect(() => {
		const id = parseInt(getStorageItem('id'), 10);
		const email = getStorageItem('token');
		const token = getStorageItem('email');
		const firstName = getStorageItem('firstName');

		if (!!id && !!email && !!token && !!firstName) {
			setUserFromLocalStorage({ id, email, token, firstName});
		}
	}, []);

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
	      <Route exact path="/" component={Main} />
      </Switch>
    </div>
  );
};

export default connect(
	null,
	{
		setUserFromLocalStorage: (userLocalStorage: any) => ({ type: userActions.setUserFromLocalStorage.request, payload: userLocalStorage }), // direct to reducer
	}
)(App);
