import { fork, takeEvery } from "redux-saga/effects";

// lots
import {
  fetchLots,
  fetchLot,
  createNewLot,
  updateLot,
  deleteLot,
  setLot,
  uploadLotCover,
  executeOrder,
  receiveOrder
} from "../domain/lots/sagas";
import * as lotsActions from "../domain/lots/actions";

// bids
import { fetchBids, createBid } from "../domain/bids/sagas";
import * as bidsActions from "../domain/bids/actions";

// users
import {
  fetchProfile,
  createUser,
  makeLogin,
  makeLogout,
  sendVerifyEmail,
  sendForgotPassword,
  sendResetPassword
} from "../domain/user/sagas";
import * as userActions from "../domain/user/actions";

// orders
import {
  fetchOrders,
  fetchOrder,
  createOrder,
  updateOrder
} from "../domain/orders/sagas";
import * as ordersActions from "../domain/orders/actions";

interface WatchComponents {
  [s: string]: any;
}

const watchComponents: WatchComponents = {
  [lotsActions.fetchLots.request]: fetchLots,
  [lotsActions.fetchLot.request]: fetchLot,
  [lotsActions.createLot.request]: createNewLot,
  [lotsActions.updateLot.request]: updateLot,
  [lotsActions.deleteLot.request]: deleteLot,
  [lotsActions.setLot.request]: setLot,
  [lotsActions.uploadCover.request]: uploadLotCover,
  [lotsActions.executeOrder.request]: executeOrder,
  [lotsActions.receiveOrder.request]: receiveOrder,

  [bidsActions.fetchBids.request]: fetchBids,
  [bidsActions.createBid.request]: createBid,

  [userActions.fetchProfile.request]: fetchProfile,
  [userActions.createNewUser.request]: createUser,
  [userActions.login.request]: makeLogin,
  [userActions.logout.request]: makeLogout,
  [userActions.verifyEmail.request]: sendVerifyEmail,
  [userActions.forgotPassword.request]: sendForgotPassword,
  [userActions.resetPassword.request]: sendResetPassword,

  [ordersActions.fetchOrders.request]: fetchOrders,
  [ordersActions.fetchOrder.request]: fetchOrder,
  [ordersActions.createOrder.request]: createOrder,
  [ordersActions.updateOrder.request]: updateOrder
};

export function* components() {
  for (const request in watchComponents) {
    yield takeEvery(request, watchComponents[request]);
  }
}

export default function*() {
  yield fork(components);
}
