import reducerActionInterface from "./../../interfaces/reducerAction";
import * as lotsActions from "./actions";
import LotInterface from "../../interfaces/lot";

export interface LotsStateInterface {
  resources: LotInterface[];
  resource: LotInterface;
  meta: {
    page: number,
    perPage: number,
    total: number,
  },
  isLoading: boolean;
}

export const lotsInitialState:LotsStateInterface = {
  resources: [],
  resource: {
    id: 0,
    title: '',
    image: '',
    description: '',
    status: '',
    createAt: '',
    currentPrice: 0,
    estimatedPrice: 0,
    endTime: '',
    user: null,
  },
  meta: {
    page: 1,
    perPage: 1,
    total: 0
  },
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
