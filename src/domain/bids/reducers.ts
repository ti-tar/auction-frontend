import * as bidsActions from "./actions";
import BidsInterface from "../../interfaces/bid";
import { ActionType } from "../../interfaces/actionTypes";
import { Reducer } from "redux";

export interface BidsStateInterface {
  resources: BidsInterface[];
  meta: {
    page: number;
    perPage: number;
    total: number;
  };
  isLoading: boolean;
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

export const bidsReducers: Reducer = (bidsState: BidsStateInterface, { type, payload }: ActionType) => {
  switch (type) {
    case bidsActions.fetchBids.request:
      return { ...bidsState, isLoading: true };

    case bidsActions.fetchBids.success:
      if (payload && payload.resources) {
        return {
          resources: [...payload.resources],
          meta: payload.meta,
          isLoading: false
        };
      }
      return { ...bidsInitialState };

    case bidsActions.fetchBids.failure:
      return { ...bidsInitialState };

    default:
      return { ...bidsState };
  }
};
