import reducerActionInterface from './../../interfaces/reducerAction';
import * as userActions from './actions';

declare type UserInitialState = {
  id: number,
  email: string,
  firstName: string,
  token: string,
  isLoading: boolean,
}

export const userInitialState: UserInitialState = {
  id: 0,
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

      // login
      case userActions.login.request: {
        return {
          ...state,
          isLoading: true,
        };
      }

      case userActions.login.success: {

        return {
          ...state,
          id: action.payload.resource.id,
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
      
      case userActions.verifyEmail.success: {

        return {
          ...state,
          id: action.payload.resource.id,
          email: action.payload.resource.email,
          firstName: action.payload.resource.firstName,
          token: action.payload.resource.token,
          isLoading: false,
        };
      }

      case userActions.verifyEmail.failure: {
        return {
          ...state,
          isLoading: false,
        };
      }

      // direct from component without saga
      case userActions.setUserFromLocalStorage.request: {
        return {
          ...state,
          id: action.payload.id,
          email: action.payload.email,
          firstName: action.payload.firstName,
          token: action.payload.token,
        };
      }

      // logout
      case userActions.logout.success: {
        return {
          ...state,
          id: 0,
          email: "",
          firstName: "",
          token: "",
        };
      }

      // create user
      case userActions.createNewUser.request: {
        return {
          ...userInitialState,
          isLoading: true,
        };
      }

      case userActions.createNewUser.success: {
        console.log(action.payload);
        return {
          ...userInitialState,
          id: action.payload.resource.id,
          email: action.payload.resource.email,
          firstName: action.payload.resource.firstName,
          token: action.payload.resource.token,
          status: action.payload.resource.status,
          isLoading: false,
        };
      }

      case userActions.createNewUser.failure: {
        return {
          ...userInitialState,
          isLoading: false,
        };
      }


      //
      default:
        return { ...state };
    }


  }
};
