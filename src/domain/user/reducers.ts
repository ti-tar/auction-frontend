import * as userActions from "./actions";

import { ActionType } from "../../interfaces/actionTypes";
import { Reducer } from "redux";

export interface UserStateInterface {
  id: number;
  email: string;
  firstName: string;
  token: string;
  isLoading: boolean;
}

export const userInitialState: UserStateInterface = {
  id: 0,
  email: "",
  firstName: "",
  token: "",
  isLoading: false
};

export const userReducer: Reducer = (state: UserStateInterface, { type, payload }: ActionType) => {
  switch (type) {
    case userActions.fetchProfile.request:
      return { ...state };

    //
    case userActions.login.request:
      return { ...userInitialState, isLoading: true };

    case userActions.login.success:
      return {
        id: payload.resource.id,
        email: payload.resource.email,
        firstName: payload.resource.firstName,
        token: payload.resource.token,
        isLoading: false
      };

    case userActions.login.failure:
      return { ...userInitialState, isLoading: false };

    case userActions.verifyEmail.success:
      return {
        id: payload.resource.id,
        email: payload.resource.email,
        firstName: payload.resource.firstName,
        token: payload.resource.token,
        isLoading: false
      };

    //
    case userActions.verifyEmail.failure:
      return { ...state, isLoading: false };

    // direct from component without saga
    case userActions.setUserFromLocalStorage.request:
      return { ...payload };

    // logout
    case userActions.logout.success:
      return {
        ...state,
        id: 0,
        email: "",
        firstName: "",
        token: ""
      };

    // create user
    case userActions.createNewUser.request:
      return { ...userInitialState, isLoading: true };

    case userActions.createNewUser.success:
      return {
        ...userInitialState,
        id: payload.resource.id,
        email: payload.resource.email,
        firstName: payload.resource.firstName,
        token: payload.resource.token,
        status: payload.resource.status,
        isLoading: false
      };

    case userActions.createNewUser.failure:
      return { ...userInitialState, isLoading: false };

    default:
      return { ...state };
  }
};
