import { put, call } from "redux-saga/effects";
import { change } from "redux-form";
import Api from "../../api";
import * as lotsActions from "../../domain/lots/actions";
import { showAxiosErrors, toast } from "../../libs/helpers";
import {
  FetchLotActionType,
  FetchLotsActionType,
  UpdateLotActionType,
  CreateLotActionType,
  SetLotToAuctionActionType,
  DeleteLotActionType,
  UploadCoverActionType,
  ActionType,
  ExecuteLotActionType,
  ReceiveLotActionType
} from "../../interfaces/actionTypes";
import { FORMS } from "../../constants";

export function* fetchLots({ payload: { filter, page } }: FetchLotsActionType) {
  function getHandler(filter: string): any {
    switch (filter) {
      case "ownLots":
        return Api.fetchOwnLots;
      case "ownBids":
        return Api.fetchLotsWithBids;
      default:
        return Api.fetchLots;
    }
  }

  const ApiHandler = getHandler(filter);

  try {
    const { data } = yield call(ApiHandler, { page });

    yield put({
      type: lotsActions.fetchLots.success,
      payload: data
    });
  } catch (errors) {
    showAxiosErrors(errors.response);

    yield put({
      type: lotsActions.fetchLots.failure,
      payload: errors
    });
  }
}

export function* fetchLot({ payload: { lotId } }: FetchLotActionType) {
  try {
    const { data } = yield call(Api.fetchLot, { lotId });

    yield put({
      type: lotsActions.fetchLot.success,
      payload: data
    });
  } catch (errors) {
    showAxiosErrors(errors.response);

    yield put({
      type: lotsActions.fetchLot.failure,
      payload: errors
    });
  }
}

export function* clearLot() {
  yield put({ type: lotsActions.clearLot.success });
}

export function* updateLot({ payload: { lotId, updatedLot }, history }: UpdateLotActionType) {
  try {
    const { data } = yield call(Api.updateLot, { lotId, updatedLot });

    yield put({
      type: lotsActions.createLot.success,
      payload: data
    });

    toast("Lot successfully updated!", "success");
    history.push(`/lots/${data.resource.id}`);
  } catch (errors) {
    showAxiosErrors(errors.response);
    yield put({
      type: lotsActions.createLot.failure,
      payload: errors
    });
  }
}

export function* createNewLot({ payload: { newLot }, history }: CreateLotActionType) {
  try {
    const { data } = yield call(Api.createLot, { newLot });
    yield put({
      type: lotsActions.createLot.success,
      payload: data
    });
    toast("Lot successfully added!", "success");
    history.push(`/lots/${data.resource.id}`);
  } catch (errors) {
    showAxiosErrors(errors.response);
    yield put({
      type: lotsActions.createLot.failure,
      payload: errors
    });
  }
}

export function* deleteLot({ payload: { lotId }, history }: DeleteLotActionType) {
  try {
    yield call(Api.deleteLot, { lotId });
    toast("Lot successfully deleted!", "success");
    history.push(`/lots`);
  } catch (errors) {
    showAxiosErrors(errors.response);
    yield put({
      type: lotsActions.deleteLot.failure,
      payload: errors
    });
  }
}

export function* setLot(action: SetLotToAuctionActionType) {
  const { lotId } = action.payload;

  try {
    yield call(Api.setLot, { lotId });
    toast("Lot successfully set to auction!", "success");
    action.history.push(`/lots`);
  } catch (errors) {
    showAxiosErrors(errors.response);
    yield put({
      type: lotsActions.deleteLot.failure,
      payload: errors
    });
  }
}

export function* uploadLotCover({ payload: { formData } }: UploadCoverActionType) {
  try {
    const { data } = yield call(Api.uploadLotCover, { formData });
    toast("Lot cover successfully uploaded!", "success");

    yield put(change(FORMS.FORM_LOT_EDIT, "image", data.file.fileName));
  } catch (errors) {
    showAxiosErrors(errors.response);
    yield put({
      type: lotsActions.uploadCover.failure,
      payload: errors
    });
  }
}

export function* executeOrder({ payload: { lotId }, history }: ExecuteLotActionType) {
  try {
    const { data } = yield call(Api.executeOrder, { lotId });
    yield put({
      type: lotsActions.executeOrder.success,
      payload: data
    });
    history.push(`/lots/${lotId}`);
  } catch (errors) {
    showAxiosErrors(errors.response);
    yield put({
      type: lotsActions.executeOrder.failure,
      payload: errors
    });
  }
}

export function* receiveOrder({ payload: { lotId }, history }: ReceiveLotActionType) {
  try {
    const { data } = yield call(Api.receiveOrder, { lotId });
    yield put({
      type: lotsActions.receiveOrder.success,
      payload: data
    });
    history.push(`/lots/${lotId}`);
  } catch (errors) {
    showAxiosErrors(errors.response);
    yield put({
      type: lotsActions.receiveOrder.failure,
      payload: errors
    });
  }
}
