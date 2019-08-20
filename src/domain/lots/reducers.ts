import reducerActionInterface from './../../interfaces/reducerAction';
import * as lotsActions from './actions';


export const lotsInitialState = {
  resources: [],
  meta: {},
  isLoading: false,
};


export const reducer = {
  lots(lotsState = lotsInitialState, action: reducerActionInterface) {

    const { type, payload } = action;

    switch (type) {
      case lotsActions.fetchLots.request: {
        return  {
          ...lotsState,
            isLoading: true,
        };
      }

      case lotsActions.fetchLots.success: {
        if( payload && payload.resources ){
          return  {
            ...lotsState,
            resources: [...payload.resources],
            meta: payload.meta,
            isLoading: false
          };
        }

        return {
          ...lotsState,
          isLoading: false,
        };
      }

      case lotsActions.fetchLots.failure: {
        return {
          ...lotsState,
            isLoading: false,
        };
      }

      default:
          return { ...lotsState };
    }
  }
};
