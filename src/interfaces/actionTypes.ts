import { History } from "history";
import { OrderFormValues } from "../components/form/orderForm";
import { UserCreateInterface } from "../components/form/signupForm";
import { LotFormValues } from "../components/form/lotForm";
import { BidFormData } from "../components/form/bidForm";

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

export interface ForgotPasswordActionType extends ActionType {
  payload: {
    email: string;
  };
  history: History;
}

export interface ResetPasswordActionType extends ActionType {
  payload: {
    token: string;
    password: string;
    passwordConfirm: string;
  };
  history: History;
}

export interface VerifyEmailActionType extends ActionType {
  payload: {
    token: string;
  };
  history: History;
}

// lots
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
    updatedLot: LotFormValues;
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

export interface UploadCoverActionType extends ActionType {
  payload: {
    formData: FormData;
  };
}

export interface CreateLotActionType extends ActionType {
  payload: {
    newLot: LotFormValues;
  };
  history: History;
}

export interface ExecuteLotActionType extends ActionType {
  payload: {
    lotId: number;
  };
  history: History;
}

export interface ReceiveLotActionType extends ActionType {
  payload: {
    lotId: number;
  };
  history: History;
}

// bids
export interface BidsActionType extends ActionType {
  payload: {
    lotId: number;
  };
  history: History;
}
export interface CreateBidActionType extends ActionType {
  payload: {
    lotId: number;
    newBid: BidFormData;
  };
  history: History;
}

// orders
export interface FetchOrdersActionType extends ActionType {
  payload: {
    filters?: string;
  };
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
