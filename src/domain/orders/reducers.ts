import * as ordersActions from "./actions";
import OrderInterface from "../../interfaces/order";
import { ActionType } from "../../interfaces/actionTypes";
import { Reducer } from "redux";

export interface OrderState {
  resources: OrderInterface[];
  meta: {};
  isLoading: boolean;
}

export const ordersInitialState: OrderState = {
  resources: [],
  meta: {},
  isLoading: false
};

export const ordersReducers: Reducer = (
  ordersState: OrderState,
  { type, payload }: ActionType
) => {
  switch (type) {
    case ordersActions.fetchOrders.request: {
      return { ...ordersInitialState, isLoading: true };
    }

    case ordersActions.fetchOrders.success:
      return {
        resources: [...payload.resources],
        meta: payload.meta,
        isLoading: false
      };

    case ordersActions.fetchOrders.failure:
      return { ...ordersState, isLoading: false };

    default:
      return { ...ordersState };
  }
};
