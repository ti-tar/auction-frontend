import { put, call } from "redux-saga/effects";
import Api from "../../api";
import * as orderActions from "../../domain/orders/actions";
import { showAxiosErrors } from "../../libs/helpers";
import {
  FetchOrderActionType,
  OrderActionType
} from "../../interfaces/actionTypes";

export function* fetchOrders() {
  try {
    const { data } = yield call(Api.fetchOrders);
    yield put({ type: orderActions.fetchOrders.success, payload: data });
  } catch (errors) {
    showAxiosErrors(errors.response);
    yield put({
      type: orderActions.fetchOrders.failure,
      payload: errors
    });
  }
}

export function* fetchOrder({ payload: { orderId } }: FetchOrderActionType) {
  try {
    const { data } = yield call(Api.fetchOrder, { orderId });

    yield put({
      type: orderActions.fetchOrder.success,
      payload: data
    });
  } catch (errors) {
    showAxiosErrors(errors.response);

    yield put({
      type: orderActions.fetchOrder.failure,
      payload: errors
    });
  }
}

export function* createOrder({ payload: { lotId, order } }: OrderActionType) {
  console.log(order);
  try {
    const { data } = yield call(Api.createOrder, { lotId, order });
    yield put({
      type: orderActions.createOrder.success,
      payload: data
    });
  } catch (e) {
    showAxiosErrors(e.response);
    yield put({ type: orderActions.createOrder.failure, payload: e });
  }
}

export function* updateOrder({ payload: { lotId, order } }: OrderActionType) {
  try {
    const { data } = yield call(Api.updateOrder, { lotId, order });
    yield put({
      type: orderActions.updateOrder.success,
      payload: data
    });
  } catch (e) {
    showAxiosErrors(e.response);
    yield put({ type: orderActions.createOrder.failure, payload: e });
  }
}
