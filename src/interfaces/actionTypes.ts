import { History } from "history";
import LotCreateInterface from "./lotCreate";
import { OrderFormValues } from "../components/form/orderForm";
import { UserCreateInterface } from "../components/form/signupForm";

export interface ActionType {
  type: string;
  payload?: any;
}

export interface AuthActionType extends ActionType {
  history: History;
}

export interface SignUpActionType extends ActionType {
  payload: {
    newUser: UserCreateInterface;
  };
  history: History;
}

export interface FetchLotsActionType extends ActionType {
  payload: {
    filter: string;
    page: number;
  };
}

export interface FetchLotActionType extends ActionType {
  payload: {
    lotId: number;
  };
}

export interface UpdateLotActionType extends ActionType {
  payload: {
    lotId: number;
    updatedLot: any;
  };
  history: History;
}

export interface DeleteLotActionType extends ActionType {
  payload: {
    lotId: number;
  };
  history: History;
}

export interface SetLotToAuctionActionType extends ActionType {
  payload: {
    lotId: number;
  };
  history: History;
}

export interface CreateLotActionType extends ActionType {
  payload: {
    newLot: LotCreateInterface;
  };
  history: History;
}

export interface FetchOrderActionType extends ActionType {
  payload: {
    orderId: number;
  };
  history: History;
}

export interface OrderActionType extends ActionType {
  payload: {
    lotId: number;
    order: OrderFormValues;
  };
  history: History;
}
