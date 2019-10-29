import { toast as toastNative } from "react-toastify";
import responseErrorInterface from "../interfaces/responseError";
import BidsInterface from "../interfaces/bid";

export const toast = (msg: string, type = "") => {
  switch (type) {
    case "success":
      toastNative.success(msg, {
        position: toastNative.POSITION.TOP_RIGHT
      });
      break;
    case "info":
      toastNative.info(msg, {
        position: toastNative.POSITION.TOP_RIGHT
      });
      break;
    case "warn":
      toastNative.warn(msg, {
        position: toastNative.POSITION.TOP_RIGHT
      });
      break;
    default:
      toastNative.error(msg, {
        position: toastNative.POSITION.TOP_RIGHT
      });
  }
};

// response is payload object from saga to reducer
export const showAxiosErrors = (response: responseErrorInterface) => {
  // todo
  if (response && response.data && Array.isArray(response.data)) {
    response.data.forEach(errObj => {
      toast(errObj.message);
      return;
    });
    return;
  }

  if (response && response.data && response.data.message) {
    toast(response.data.message);
    return;
  }

  if (response && response.data && response.data.error) {
    toast(response.data.error);
    return;
  }

  if (Array.isArray(response)) {
    response.forEach(errObj => {
      toast(errObj.message);
      return;
    });
    return;
  }

  if (response && response.message) {
    toast(response.message);
    return;
  }

  toast("Unknown server error");
};

export const getWinnersBid = (bids: BidsInterface[]): BidsInterface | undefined => {
  const arr: number[] = bids.map(b => b.proposedPrice);
  const maxPrice = Math.max(...arr);
  return bids.find(b => b.proposedPrice === maxPrice);
};
