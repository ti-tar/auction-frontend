import reducerActionInterface from "./../../interfaces/reducerAction";
import * as bidsActions from "./actions";

export const bidsInitialState: any = {
  resources: [],
  meta: {
    total: 0
  },
  isLoading: false
};

export const reducer = {
  bids(bidsState = bidsInitialState, action: reducerActionInterface) {
    const { type, payload } = action;

    switch (type) {
      //  fetch all Lots

      case bidsActions.fetchBids.request: {
        return {
          ...bidsState,
          isLoading: true
        };
      }
      case bidsActions.fetchBids.success: {
        if (payload && payload.resources) {
          return {
            ...bidsState,
            resources: [...payload.resources],
            meta: payload.meta,
            isLoading: false
          };
        }
        return {
          ...bidsState,
          isLoading: false
        };
      }
      case bidsActions.fetchBids.failure: {
        return {
          ...bidsState,
          isLoading: false
        };
      }

      default:
        return { ...bidsState };
    }
  }
};
