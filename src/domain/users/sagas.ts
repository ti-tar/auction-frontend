import { put, call } from 'redux-saga/effects';
import Api from '../../api';
import * as usersActions from '../../domain/users/actions';
import { showAxiosErrors } from '../../libs/helpers';


export function* fetchUsers() {
  try {
    const { data } = yield call(Api.fetchUsers);

    yield put({
      type: usersActions.fetchUsers.success,
      payload: data,
    });
    
  } catch (errors) {
    showAxiosErrors(errors.response);

    yield put({
      type: usersActions.fetchUsers.failure,
      payload: errors,
    });
  }
}