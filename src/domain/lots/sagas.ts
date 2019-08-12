import { put, call } from 'redux-saga/effects';
import Api from '../../api';
import * as lotsActions from '../../domain/lots/actions';
import { showAxiosErrors } from '../../libs/helpers';


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