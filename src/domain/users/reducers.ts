import actionInterface from './../../interfaces/action';
import * as usersActions from './actions';


const State = {
  resources: {},
  isLoading: false,
};


export const reducer = {
  users(state = State, action: actionInterface) {
    switch (action.type) {
      case usersActions.fetchUsers.request: {
        return state;
      }
      default:
        return { ...state };
    }
  }
};
