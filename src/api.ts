import axios from 'axios/index';
import qs from 'qs';

const getAxiosInstance = () => axios.create({
  baseURL: process.env.REACT_APP_API_URL,
  // withCredentials: true,
  withCredentials: false,
  paramsSerializer: params => qs.stringify(params, { encode: false, skipNulls: true, arrayFormat: 'brackets' }),
});

const httpClient = getAxiosInstance();

// axiosInstance.interceptors.request.use(config => ({
//   ...config,
//   headers: {
//     Authorization: `Bearer ${getStorageItem('token')}`,
//     ...config.headers,
//   },
//   withCredentials: true,
// }), err => Promise.reject(err));

// const prefix = '/api/v1';
const prefix = '/api';

export default {
  // lots
  fetchLots: () => httpClient.get(`${prefix}/lots`),
  // users
  fetchUsers: () => httpClient.get(`${prefix}/users`),
};