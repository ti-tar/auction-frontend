import { put, call } from 'redux-saga/effects';
import Api from '../../api';
import * as usersActions from '../../domain/users/actions';
import {showAxiosErrors, toast} from '../../libs/helpers';
import * as lotsActions from "../lots/actions";


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


export function* createUser(action: any) {
  try {
    const { data } = yield call(Api.createUser, action.payload);

    yield put({
      type: usersActions.createNewUser.success,
      payload: data,
    });

    toast('User successfully registered!', 'success');

    // action.history.push(`/users/${data.resource.id}`);

  } catch (errors) {
    showAxiosErrors(errors.response.data);
    yield put({
      type: usersActions.createNewUser.failure,
      payload: errors,
    });
  }
}