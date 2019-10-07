import { put, call } from "redux-saga/effects";
import Api from "../../api";
import * as lotsActions from "../../domain/lots/actions";
import { showAxiosErrors, toast } from "../../libs/helpers";

export function* fetchLots({ payload }: any) {
  const { filter } = payload;

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
    const { data } = yield call(ApiHandler);

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

export function* fetchLot(action: any) {
  if (!action.payload.lotId) {
    yield put({
      type: lotsActions.resetLot.request
    });
    return;
  }

  try {
    const { data } = yield call(Api.fetchLot, { lotId: action.payload.lotId });

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

export function* updateLot(action: any) {
  const { lotId, updatedLot } = action.payload;
  try {
    const { data } = yield call(Api.updateLot, { lotId, updatedLot });

    yield put({
      type: lotsActions.createNewLot.success,
      payload: data
    });

    toast("Lot successfully updated!", "success");

    action.history.push(`/lots/${data.resource.id}`);
  } catch (errors) {
    showAxiosErrors(errors.response);
    yield put({
      type: lotsActions.createNewLot.failure,
      payload: errors
    });
  }
}

export function* createNewLot(action: any) {
  try {
    const { data } = yield call(Api.createNewLot, action.payload);

    yield put({
      type: lotsActions.createNewLot.success,
      payload: data
    });

    toast("Lot successfully added!", "success");

    action.history.push(`/lots/${data.resource.id}`);
  } catch (errors) {
    showAxiosErrors(errors.response);
    yield put({
      type: lotsActions.createNewLot.failure,
      payload: errors
    });
  }
}

export function* deleteLot(action: any) {
  const { lotId } = action.payload;

  try {
    yield call(Api.deleteLot, lotId);
    toast("Lot successfully deleted!", "success");
    action.history.push(`/lots`);
  } catch (errors) {
    showAxiosErrors(errors.response);
    yield put({
      type: lotsActions.deleteLot.failure,
      payload: errors
    });
  }
}

export function* setLot(action: any) {
  const { lotId } = action.payload;

  try {
    yield call(Api.setLot, lotId);
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