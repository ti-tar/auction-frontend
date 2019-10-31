import { put, call } from "redux-saga/effects";
import Api from "../../api";
import * as orderActions from "../../domain/orders/actions";
import { showAxiosErrors, toast } from "../../libs/helpers";
import { FetchOrderActionType, FetchOrdersActionType, OrderActionType } from "../../interfaces/actionTypes";

export function* fetchOrders({ payload: { filters } }: FetchOrdersActionType) {
  try {
    const { data } = yield call(Api.fetchOrders, { filters });
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

export function* createOrder({ payload: { lotId, order }, history }: OrderActionType) {
  console.log(order);
  try {
    const { data } = yield call(Api.createOrder, { lotId, order });
    yield put({
      type: orderActions.createOrder.success,
      payload: data
    });
    toast("Order created successfully", "success");
    history.push(`/lots/${lotId}`);
  } catch (e) {
    showAxiosErrors(e.response);
    yield put({ type: orderActions.createOrder.failure, payload: e });
  }
}

export function* updateOrder({ payload: { lotId, order }, history }: OrderActionType) {
  try {
    const { data } = yield call(Api.updateOrder, { lotId, order });
    yield put({
      type: orderActions.updateOrder.success,
      payload: data
    });
    toast("Order updated successfully", "success");
    history.push(`/lots/${lotId}`);
  } catch (e) {
    showAxiosErrors(e.response);
    yield put({ type: orderActions.createOrder.failure, payload: e });
  }
}
