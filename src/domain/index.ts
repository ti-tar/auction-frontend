import {
  combineReducers,
  createStore,
  applyMiddleware,
  compose,
  ReducersMapObject
} from "redux";
import createSagaMiddleware from "redux-saga";

// reducers
import {
  lotsInitialState,
  LotsStateInterface,
  lotsReducers
} from "./lots/reducers";
import {
  userInitialState,
  userReducer,
  UserStateInterface
} from "./user/reducers";
import {
  bidsInitialState,
  BidsStateInterface,
  bidsReducers
} from "./bids/reducers";

import {
  ordersReducers,
  OrderState,
  ordersInitialState
} from "./orders/reducers";

// redux-form
import { reducer as ReduxFormReducers } from "redux-form";

declare global {
  interface Window {
    __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: any;
  }
}

export interface StateInterface {
  user: UserStateInterface;
  lots: LotsStateInterface;
  bids: BidsStateInterface;
  orders: OrderState;
  form: any;
}

const stateInitialValue: StateInterface = {
  user: userInitialState,
  lots: lotsInitialState,
  bids: bidsInitialState,
  orders: ordersInitialState,
  form: null
};

const reducers: ReducersMapObject = {
  lots: lotsReducers,
  user: userReducer,
  bids: bidsReducers,
  orders: ordersReducers,
  form: ReduxFormReducers
};

export default () => {
  const composeEnhancers =
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
  const sagaMiddleware = createSagaMiddleware();

  const store = createStore(
    combineReducers(reducers),
    stateInitialValue,
    composeEnhancers(applyMiddleware(sagaMiddleware))
  );

  return { ...store, runSaga: sagaMiddleware.run };
};
