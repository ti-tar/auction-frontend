
import * as lotsActions from 'domain/lots/actions';


const State = {
  resources: {},
  isLoading: false,
};


export const reducer = {
  lots(state = State, action) {
    switch (action.type) {
      case lotsActions.fetchLots.request: {
        return state;
      }
      default:
        return state;
    }
  }
};
