import reducerActionInterface from './../../interfaces/reducerAction';
import * as userActions from './actions';

declare type UserInitialState = {
  email: string,
  firstName: string,
  token: string,
  isLoading: boolean,
}

export const userInitialState: UserInitialState = {
  email: "",
  firstName: "",
  token: "",
  isLoading: false,
};


export const reducer = {
  user(state = userInitialState, action: any) {
    switch (action.type) {

      case userActions.fetchProfile.request: {
        return { ...state };
      }

      case userActions.login.request: {
        return {
          ...state,
          isLoading: true,
        };
      }

      case userActions.login.success: {

        return {
          ...state,
          email: action.payload.resource.email,
          firstName: action.payload.resource.firstName,
          token: action.payload.resource.token,
          isLoading: false,
        };
      }

      case userActions.login.failure: {
        return {
          ...state,
          isLoading: false,
        };
      }

      // direct from component without saga
      case userActions.setUserFromLocalStorage.request: {
        return {
          ...state,
          email: action.payload.email,
          firstName: action.payload.firstName,
          token: action.payload.token,
        };
      }

      // logout
      case userActions.logout.success: {
        return {
          ...state,
          email: "",
          firstName: "",
          token: "",
        };
      }

      default:
        return { ...state };
    }


  }
};
