import { fork, takeEvery } from 'redux-saga/effects';

// lots
import { fetchLots, fetchLot, createNewLot } from '../domain/lots/sagas';
import * as lotsActions from '../domain/lots/actions';

// users
import { fetchUsers, createUser, makeLogin } from '../domain/users/sagas';
import * as usersActions from '../domain/users/actions';

export function* components() {
  // lots
  yield takeEvery(lotsActions.fetchLots.request, fetchLots);
  yield takeEvery(lotsActions.fetchLot.request, fetchLot);
  yield takeEvery(lotsActions.createNewLot.request, createNewLot);

  // users
  yield takeEvery(usersActions.fetchUsers.request, fetchUsers);

  // user register
  yield takeEvery(usersActions.createNewUser.request, createUser);

  // user login
  yield takeEvery(usersActions.login.request, makeLogin);
}

export default function* () {
  yield fork(components);
}