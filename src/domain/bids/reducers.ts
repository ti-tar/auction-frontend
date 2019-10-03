import reducerActionInterface from "./../../interfaces/reducerAction";
import * as bidsActions from "./actions";
import BidsInterface from "../../interfaces/bid";

export interface BidsStateInterface {
  resources: BidsInterface[] | [],
  meta: {
    page: number,
    perPage: number,
    total: number,
  },
  isLoading: boolean
}

export const bidsInitialState: BidsStateInterface = {
  resources: [],
  meta: {
    page: 1,
    perPage: 10,
    total: 0
  },
  isLoading: false
};

export const reducer = {
  bids(bidsState = bidsInitialState, action: reducerActionInterface) {
    const { type, payload } = action;
    switch (type) {
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
