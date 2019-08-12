import { toast as toast123 } from 'react-toastify';
import responseErrorInterface from '../interfaces/responseError';

export const toast = (msg = '', type = '') => {
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
export const showAxiosErrors = (response: responseErrorInterface[]) => {

  response.forEach((errObj) => {
    toast(errObj.message);
  });

  //  else {
  //   toast('Unknown server error');
  // }
};