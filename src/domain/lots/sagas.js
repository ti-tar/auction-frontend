import { put, call } from 'redux-saga/effects';
import Api from 'api';
import * as lotsActions from 'domain/lots/actions';
import { showAxiosErrors } from 'libs/helpers';


export function* fetchBatches({ payload, filter, params = {} }) {
  try {
    const { data } = yield call(Api.fetchLots);

    yield put({
      type: lotsActions.lotsActions.success,
      payload: data,
    });
  } catch (errors) {
    showAxiosErrors(errors.response);

    yield put({
      type: lotsActions.lotsActions.failure,
      payload: errors,
    });
  }
}