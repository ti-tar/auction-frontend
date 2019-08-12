import { fork } from 'redux-saga/effects';

import watchComponents from './../sagas/components';

export default function* rootSaga() {
  yield* [
    // components watchers
    fork(watchComponents),
  ];
}