import reducerActionInterface from './../../interfaces/reducerAction';
import * as usersActions from './actions';


export const usersInitialState = {
  resources: [],
  meta: {},
  isLoading: false,
};


export const reducer = {
  users(state = usersInitialState, action: reducerActionInterface) {
    switch (action.type) {
      case usersActions.fetchUsers.request: {
        return { ...state };
      }
      default:
        return { ...state };
    }


  }
};
