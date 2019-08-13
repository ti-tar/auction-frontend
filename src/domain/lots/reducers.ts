import actionInterface from './../../interfaces/action';
import * as lotsActions from './actions';


export const lotsInitialState = {
  resources: [],
  isLoading: false,
};


export const reducer = {
  lots(state = lotsInitialState, action: actionInterface) {
    switch (action.type) {
      case lotsActions.fetchLots.request: {
        return state;
      }
      default:
        return state;
    }
  }
};
