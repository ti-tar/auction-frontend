import { toast as toast123 } from 'react-toastify';
import responseErrorInterface from '../interfaces/responseError';

export const toast = (msg: string, type: string = '') => {
  switch (type) {
    case 'success':
      toast123.success(msg, {
        position: toast123.POSITION.TOP_RIGHT,
      });
      break;
    case 'info':
      toast123.info(msg, {
        position: toast123.POSITION.TOP_RIGHT,
      });
      break;
    case 'warn':
      toast123.warn(msg, {
        position: toast123.POSITION.TOP_RIGHT,
      });
      break;
    default:
      toast123.error(msg, {
        position: toast123.POSITION.TOP_RIGHT,
      });
  }
};



// response is payload object from saga to reducer
export const showAxiosErrors = (response: responseErrorInterface ) => {

  // todo
  if (response && response.data && Array.isArray(response.data)){
    response.data.forEach((errObj) => {
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

  if (Array.isArray(response)){
    response.forEach((errObj) => {
      toast(errObj.message);
      return;
    });
    return;
  }

  if (response && response.message) {
    toast(response.message);
    return;
  }

  toast('Unknown server error');
};