import actionInterface from './../../interfaces/action';
import lotsReducerInterface from './../../interfaces/lotsReducer';
import * as usersActions from './actions';



export const usersInitialState = {
  resources: [],
  isLoading: false,
};


export const reducer = {
  users(state = usersInitialState, action: actionInterface) {
    switch (action.type) {
      case usersActions.fetchUsers.request: {
        return state;
      }
      default:
        return { ...state };
    }
  }
};
