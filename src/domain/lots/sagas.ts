import { put, call } from 'redux-saga/effects';
import Api from '../../api';
import * as lotsActions from '../../domain/lots/actions';
import {showAxiosErrors, toast} from '../../libs/helpers';

export function* fetchLots() {
  try {
    const { data } = yield call(Api.fetchLots);

    yield put({
      type: lotsActions.fetchLots.success,
      payload: data,
    });

  } catch (errors) {
    showAxiosErrors(errors.response);

    yield put({
      type: lotsActions.fetchLots.failure,
      payload: errors,
    });
  }
}

export function* fetchLot(action: any) {
  try {
    const { data } = yield call(Api.fetchLot, {lotId: action.payload.lotId});

    yield put({
      type: lotsActions.fetchLot.success,
      payload: data,
    });

  } catch (errors) {
    showAxiosErrors(errors.response);

    yield put({
      type: lotsActions.fetchLot.failure,
      payload: errors,
    });
  }
}

export function* createNewLot(action: any) {
  try {
    const { data } = yield call(Api.createNewLot, action.payload);

    yield put({
      type: lotsActions.createNewLot.success,
      payload: data,
    });

    toast('Lot successfully added!', 'success');

    action.history.push(`/lots/${data.resource.id}`);

  } catch (errors) {
    showAxiosErrors(errors.response.data);
    yield put({
      type: lotsActions.createNewLot.failure,
      payload: errors,
    });
  }
}
