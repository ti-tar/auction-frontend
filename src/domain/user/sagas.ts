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

function setUserToLocalStorage(user: { id: string, email: string, token: string, firstName: string }):void {
  const { id, email, token, firstName } = user;

  if (!!id && !!email && !!token && !!firstName) {
    setStorageItem('id', id);
    setStorageItem('token', token);
    setStorageItem('email', email);
    setStorageItem('firstName', firstName);
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

    setUserToLocalStorage(data.resource);

    action.history.push('/auth/signup/success');

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

    setUserToLocalStorage(data.resource);

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

  window.location.href = '/';
}

export function* sendVerifyEmail({ payload, history }: any): any {
  try {
    const { data } = yield call(Api.verifyEmail, payload);
    yield put({
      type: usersActions.verifyEmail.success,
      payload: data,
    });

    setUserToLocalStorage(data.resource);
    history.push('/lots');

  } catch (errors) {
    showAxiosErrors(errors.response);
    yield put({
      type: usersActions.verifyEmail.failure
    });
  }
}

export function* sendForgotPassword({ payload, history }: any): any {
  try {
    const { data } = yield call(Api.forgotPassword, payload);
    yield put({
      type: usersActions.forgotPassword.success,
      payload: data,
    });
    history.push('/auth/login');
    toast('Letter sent! Check your email.', 'success');

  } catch (errors) {
    showAxiosErrors(errors.response);
    yield put({
      type: usersActions.forgotPassword.failure
    });
  }
}


export function* sendResetPassword({ payload, history }: any): any {
  try {
    const { data } = yield call(Api.resetPassword, payload);
    yield put({
      type: usersActions.resetPassword.success,
      payload: data,
    });
    history.push('/auth/login');
    toast('Password changes. Try to login', 'success');

  } catch (errors) {
    showAxiosErrors(errors.response);
    yield put({
      type: usersActions.resetPassword.failure
    });
  }
}
