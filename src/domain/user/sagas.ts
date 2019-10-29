import { put, call } from "redux-saga/effects";
import Api from "../../api";
import * as usersActions from "../../domain/user/actions";
import { showAxiosErrors, toast } from "../../libs/helpers";
import { setStorageItem, clearStorage } from "../../libs/storage";
import {
  AuthActionType,
  ForgotPasswordActionType,
  ResetPasswordActionType,
  SignUpActionType,
  VerifyEmailActionType
} from "../../interfaces/actionTypes";
import { UserInterface } from "../../interfaces/user";

export function* fetchProfile() {
  try {
    const { data } = yield call(Api.fetchProfile);

    yield put({
      type: usersActions.fetchProfile.success,
      payload: data
    });
  } catch (errors) {
    showAxiosErrors(errors.response);

    yield put({
      type: usersActions.fetchProfile.failure,
      payload: errors
    });
  }
}

function setUserToLocalStorage(user: UserInterface) {
  const { id, email, token, firstName } = user;
  setStorageItem("id", id);
  setStorageItem("token", token);
  setStorageItem("email", email);
  setStorageItem("firstName", firstName);
}

export function* createUser({ payload: { newUser }, history }: SignUpActionType) {
  try {
    const { data } = yield call(Api.createUser, { newUser });

    yield put({
      type: usersActions.createNewUser.success,
      payload: data
    });

    toast("User successfully registered!", "success");

    setUserToLocalStorage(data.resource);

    history.push("/auth/signup/success");
  } catch (errors) {
    showAxiosErrors(errors.response.data);
    yield put({
      type: usersActions.createNewUser.failure,
      payload: errors
    });
  }
}

export function* makeLogin({ payload, history }: AuthActionType) {
  try {
    const { data } = yield call(Api.login, payload);

    yield put({
      type: usersActions.login.success,
      payload: data
    });

    setUserToLocalStorage(data.resource);

    history.push("/lots");
  } catch (errors) {
    showAxiosErrors(errors.response);
    yield put({
      type: usersActions.login.failure,
      payload: errors
    });
  }
}

export function* makeLogout({ history }: AuthActionType) {
  clearStorage();
  yield put({ type: usersActions.logout.success });
  history.push("/");
}

export function* sendVerifyEmail({ payload: { token }, history }: VerifyEmailActionType) {
  try {
    const { data } = yield call(Api.verifyEmail, { token });
    yield put({
      type: usersActions.verifyEmail.success,
      payload: data
    });

    setUserToLocalStorage(data.resource);
    history.push("/lots");
  } catch (errors) {
    showAxiosErrors(errors.response);
    yield put({
      type: usersActions.verifyEmail.failure
    });
  }
}

export function* sendForgotPassword({ payload: { email }, history }: ForgotPasswordActionType) {
  try {
    const { data } = yield call(Api.forgotPassword, { email });
    yield put({
      type: usersActions.forgotPassword.success,
      payload: data
    });
    history.push("/auth/login");
    toast("Letter sent! Check your email.", "success");
  } catch (errors) {
    showAxiosErrors(errors.response);
    yield put({
      type: usersActions.forgotPassword.failure
    });
  }
}

export function* sendResetPassword({ payload, history }: ResetPasswordActionType) {
  try {
    const { data } = yield call(Api.resetPassword, payload);
    yield put({
      type: usersActions.resetPassword.success,
      payload: data
    });
    history.push("/auth/login");
    toast("Password changes. Try to login", "success");
  } catch (errors) {
    showAxiosErrors(errors.response);
    yield put({
      type: usersActions.resetPassword.failure
    });
  }
}
