import { combineReducers, createStore, applyMiddleware, compose, ReducersMapObject } from "redux";
import createSagaMiddleware from "redux-saga";

// reducers
import {
  reducer as domainLotsReducers,
  lotsInitialState,
  LotsStateInterface
} from "./lots/reducers";
import {
  reducer as domainUsersReducers,
  userInitialState,
  UserStateInterface
} from "./user/reducers";
import {
  reducer as domainBidsReducers,
  bidsInitialState,
  BidsStateInterface
} from "./bids/reducers";

// redux-form
import { reducer as ReduxFormReducers } from "redux-form";

declare global {
  interface Window {
    // __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: typeof compose;
    __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: any;
  }
}

export interface StateInterface {
  user: UserStateInterface,
  lots: LotsStateInterface,
  bids: BidsStateInterface,
}

const stateInitaialValue: StateInterface = {
  user: userInitialState,
  lots: lotsInitialState,
  bids: bidsInitialState
}

const reducers: ReducersMapObject = {
  ...domainLotsReducers,
  ...domainUsersReducers,
  ...domainBidsReducers,
  form: ReduxFormReducers
};

export default () => {
  const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
  const sagaMiddleware = createSagaMiddleware();

  const store = createStore(
    combineReducers(reducers),
    stateInitaialValue,
    composeEnhancers(applyMiddleware(sagaMiddleware))
  );

  return { ...store, runSaga: sagaMiddleware.run };
};

