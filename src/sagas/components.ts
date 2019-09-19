import { fork, takeEvery } from 'redux-saga/effects';

// lots
import { fetchLots, fetchLot, createNewLot, updateLot, deleteLot } from '../domain/lots/sagas';
import * as lotsActions from '../domain/lots/actions';

// bids
import { fetchBids, createBid } from '../domain/bids/sagas';
import * as bidsActions from '../domain/bids/actions';

// users
import { fetchProfile, createUser, makeLogin, makeLogout, sendVerifyEmail, sendForgotPassword, sendResetPassword } from '../domain/user/sagas';
import * as userActions from '../domain/user/actions';

export function* components() {
  // lots
  yield takeEvery(lotsActions.fetchLots.request, fetchLots);
  yield takeEvery(lotsActions.fetchLot.request, fetchLot);
  yield takeEvery(lotsActions.createNewLot.request, createNewLot);
  yield takeEvery(lotsActions.updateLot.request, updateLot);
  yield takeEvery(lotsActions.deleteLot.request, deleteLot);

  // user
  yield takeEvery(userActions.fetchProfile.request, fetchProfile);

  // bids
  yield takeEvery(bidsActions.fetchBids.request, fetchBids);
  yield takeEvery(bidsActions.createBid.request, createBid);

  // user register
  yield takeEvery(userActions.createNewUser.request, createUser);

  // user login logout
  yield takeEvery(userActions.login.request, makeLogin);
  yield takeEvery(userActions.logout.request, makeLogout);
  yield takeEvery(userActions.verifyEmail.request, sendVerifyEmail);
  yield takeEvery(userActions.forgotPassword.request, sendForgotPassword);
  yield takeEvery(userActions.resetPassword.request, sendResetPassword);
}

export default function* () {
  yield fork(components);
}