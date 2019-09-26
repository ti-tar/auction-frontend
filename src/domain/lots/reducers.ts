import reducerActionInterface from "./../../interfaces/reducerAction";
import * as lotsActions from "./actions";

export const lotsInitialState = {
  resources: [],
  resource: {},
  meta: {},
  isLoading: false
};

export const reducer = {
  lots(lotsState = lotsInitialState, action: reducerActionInterface) {
    const { type, payload } = action;

    switch (type) {
      //  fetch all Lots

      case lotsActions.resetLot.request: {
        return {
          ...lotsInitialState
        };
      }

      case lotsActions.fetchLots.request: {
        return {
          ...lotsInitialState,
          isLoading: true
        };
      }
      case lotsActions.fetchLots.success: {
        if (payload && payload.resources) {
          return {
            ...lotsState,
            resources: [...payload.resources],
            meta: payload.meta,
            isLoading: false
          };
        }
        return {
          ...lotsState,
          isLoading: false
        };
      }
      case lotsActions.fetchLots.failure: {
        return {
          ...lotsState,
          isLoading: false
        };
      }

      //  fetch Lot by Id

      case lotsActions.fetchLot.request: {
        return { ...lotsState, isLoading: true };
      }
      case lotsActions.fetchLot.success: {
        if (payload && payload.resource) {
          return {
            ...lotsState,
            resource: { ...payload.resource },
            meta: payload.meta,
            isLoading: false
          };
        }
        return { ...lotsState, isLoading: false };
      }
      case lotsActions.fetchLot.failure: {
        return {
          ...lotsState,
          isLoading: false
        };
      }

      default:
        return { ...lotsState };
    }
  }
};
