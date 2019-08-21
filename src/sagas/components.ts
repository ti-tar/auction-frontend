import { fork, takeEvery } from 'redux-saga/effects';

// lots
import { fetchLots, createNewLot } from '../domain/lots/sagas';
import * as lotsActions from '../domain/lots/actions';

// users
import { fetchUsers } from '../domain/users/sagas';
import * as usersActions from '../domain/users/actions';


export function* components() {
  // lots
  yield takeEvery(lotsActions.fetchLots.request, fetchLots);
  yield takeEvery(lotsActions.createNewLot.request, createNewLot);

  // users
  yield takeEvery(usersActions.fetchUsers.request, fetchUsers);
}

export default function* () {
  yield fork(components);
}