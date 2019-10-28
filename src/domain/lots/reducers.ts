import * as lotsActions from "./actions";
import LotInterface from "../../interfaces/lot";
import { ActionType } from "../../interfaces/actionTypes";
import { Reducer } from "redux";

export interface LotsStateInterface {
  resources: LotInterface[];
  resource: LotInterface;
  meta: {
    page: number;
    perPage: number;
    total: number;
  };
  isLoading: boolean;
}

export const lotsInitialState: LotsStateInterface = {
  resources: [],
  resource: {
    id: 0,
    title: "",
    image: "",
    description: "",
    status: "",
    createAt: "",
    currentPrice: 0,
    estimatedPrice: 0,
    endTime: "",
    user: null,
    bids: null
  },
  meta: {
    page: 1,
    perPage: 1,
    total: 0
  },
  isLoading: false
};

export const lotsReducers: Reducer = (
  lotsState: LotsStateInterface,
  { type, payload }: ActionType
) => {
  switch (type) {
    case lotsActions.fetchLots.request:
      return { ...lotsInitialState, isLoading: true };

    case lotsActions.fetchLots.success:
      if (payload && payload.resources) {
        return {
          ...lotsState,
          resources: [...payload.resources],
          meta: payload.meta,
          isLoading: false
        };
      }
      return { ...lotsState, isLoading: false };

    case lotsActions.fetchLots.failure:
      return { ...lotsInitialState };

    //
    case lotsActions.fetchLot.request:
      return { ...lotsInitialState, isLoading: true };

    case lotsActions.fetchLot.success:
      return {
        ...lotsState,
        resource: { ...payload.resource },
        isLoading: false
      };

    case lotsActions.fetchLot.failure:
      return { ...lotsInitialState };

    default:
      return { ...lotsState };
  }
};
