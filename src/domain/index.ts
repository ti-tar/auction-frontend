import {
  combineReducers, createStore, applyMiddleware, compose,
} from 'redux';
import createSagaMiddleware, { END } from 'redux-saga';

// reducers
import { reducer as domainLotsReducers } from 'domain/lots/reducer';

// redux-form
import { reducer as ReduxFormReducers } from 'redux-form';


// auth action
const rootReducers = {
  ...domainLotsReducers,
  form: ReduxFormReducers,
};


export default () => {
  const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
      latency: 25,
    })
    : compose;
  const sagaMiddleware = createSagaMiddleware();

  // init reducers
  // Admin reducers and other will be added dynamically
  const store = createStore(
    combineReducers(rootReducers),
    { lots: {}, users: {} },
    composeEnhancers(
      applyMiddleware(
        sagaMiddleware,
      ),
    ),
  );

  store.runSaga = sagaMiddleware.run;
  store.close = () => store.dispatch(END);

  return store;
};