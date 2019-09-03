import { fork, takeEvery } from 'redux-saga/effects';

// lots
import { fetchLots, fetchLot, createNewLot } from '../domain/lots/sagas';
import * as lotsActions from '../domain/lots/actions';

// users
import { fetchProfile, createUser, makeLogin, makeLogout } from '../domain/user/sagas';
import * as userActions from '../domain/user/actions';

export function* components() {
  // lots
  yield takeEvery(lotsActions.fetchLots.request, fetchLots);
  yield takeEvery(lotsActions.fetchLot.request, fetchLot);
  yield takeEvery(lotsActions.createNewLot.request, createNewLot);

  // user
  yield takeEvery(userActions.fetchProfile.request, fetchProfile);

  // bids

  // user register
  yield takeEvery(userActions.createNewUser.request, createUser);

  // user login logout
  yield takeEvery(userActions.login.request, makeLogin);
  yield takeEvery(userActions.logout.request, makeLogout);
}

export default function* () {
  yield fork(components);
}