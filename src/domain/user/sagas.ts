import { put, call } from 'redux-saga/effects';
import Api from '../../api';
import * as usersActions from '../../domain/user/actions';
import {showAxiosErrors, toast} from '../../libs/helpers';
import { setStorageItem, clearStorage } from '../../libs/storage';

export function* fetchProfile() {
  try {
    const { data } = yield call(Api.fetchProfile);

    yield put({
      type: usersActions.fetchProfile.success,
      payload: data,
    });

  } catch (errors) {
    showAxiosErrors(errors.response);

    yield put({
      type: usersActions.fetchProfile.failure,
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

    action.history.push(`/auth/login`);

  } catch (errors) {
    showAxiosErrors(errors.response.data);
    yield put({
      type: usersActions.createNewUser.failure,
      payload: errors,
    });
  }
}

export function* makeLogin(action: any) {
  try {
    const { data } = yield call(Api.login, action.payload);

    yield put({
      type: usersActions.login.success,
      payload: data,
    });

    const { id, email, token, firstName } = data.resource;

    if (!!id && !!email && !!token && !!firstName) {
      setStorageItem('id', id);
      setStorageItem('token', token);
      setStorageItem('email', email);
      setStorageItem('firstName', firstName);
    }

    action.history.push('/lots');

  } catch (errors) {
    showAxiosErrors(errors.response);
    yield put({
      type: usersActions.login.failure,
      payload: errors,
    });
  }
}

export function* makeLogout(action: any) {
  clearStorage();

  yield put({
    type: usersActions.logout.success,
  });

  // action.history.push('/');
  window.location.href = '/';
}
