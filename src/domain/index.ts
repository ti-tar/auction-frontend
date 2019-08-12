import {
  combineReducers, createStore, applyMiddleware, compose,
} from 'redux';
import createSagaMiddleware from 'redux-saga';

// reducers
import { reducer as domainLotsReducers } from './lots/reducers';
import { reducer as domainUsersReducers } from './users/reducers';

// redux-form
import { reducer as ReduxFormReducers } from 'redux-form';


// auth action
const rootReducers = {
  ...domainLotsReducers,
  ...domainUsersReducers,
  form: ReduxFormReducers,
};

declare global {
  interface Window {
    // __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: typeof compose;
    __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: any;
  }
}

export default (): any => {
  const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
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

  return { ...store, runSaga: sagaMiddleware.run };
};