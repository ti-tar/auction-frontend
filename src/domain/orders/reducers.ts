import * as ordersActions from "./actions";
import Order from "../../interfaces/order";
import { ActionType } from "../../interfaces/actionTypes";
import { Reducer } from "redux";

export interface OrderState {
  resources: Order[];
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
