import { put, call } from "redux-saga/effects";
import Api from "../../api";
import * as bidsActions from "../../domain/bids/actions";
import { showAxiosErrors, toast } from "../../libs/helpers";
import { BidsActionType, CreateBidActionType } from "../../interfaces/actionTypes";

export function* fetchBids({ payload: { lotId } }: BidsActionType) {
  try {
    const { data } = yield call(Api.fetchBids, { lotId });

    yield put({
      type: bidsActions.fetchBids.success,
      payload: data
    });
  } catch (errors) {
    showAxiosErrors(errors.response);

    yield put({
      type: bidsActions.fetchBids.failure,
      payload: errors
    });
  }
}

export function* createBid({ payload: { newBid, lotId }, history }: CreateBidActionType) {
  try {
    const { data } = yield call(Api.createBid, { newBid, lotId });

    yield put({
      type: bidsActions.createBid.success,
      payload: data
    });

    toast("Bid successfully added!", "success");

    history.push(`/lots/${lotId}/`);
  } catch (errors) {
    showAxiosErrors(errors.response);
    yield put({
      type: bidsActions.createBid.failure,
      payload: errors
    });
  }
}
