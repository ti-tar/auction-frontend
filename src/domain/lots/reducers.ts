import actionInterface from './../../interfaces/action';
import * as lotsActions from './actions';


const State = {
  resources: {},
  isLoading: false,
};


export const reducer = {
  lots(state = State, action: actionInterface) {
    switch (action.type) {
      case lotsActions.fetchLots.request: {
        return state;
      }
      default:
        return state;
    }
  }
};
