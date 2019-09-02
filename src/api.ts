import axios from 'axios/index';
import qs from 'qs';
// utils
import { getStorageItem } from './libs/storage';
// interfaces
import LotCreateInterface from './interfaces/lotCreate';
import userCreateInterface from './interfaces/userCreate';

const getAxiosInstance = () => axios.create({
  baseURL: process.env.REACT_APP_API_URL,
  // withCredentials: true,
  withCredentials: false,
  paramsSerializer: params => qs.stringify(params, { encode: false, skipNulls: true, arrayFormat: 'brackets' }),
});

const httpClient = getAxiosInstance();

httpClient.interceptors.request.use(config => ({
  ...config,
  headers: {
    Authorization: `Bearer ${getStorageItem('token')}`,
    ...config.headers,
  },
}), err => Promise.reject(err));


// const prefix = '/api/v1';
const prefix = '/api';

export default {
  //signIn: ({ data }) => httpClient.post(`${prefix}/sign-in`, data),
  //signUp: ({ data }) => httpClient.post(`${prefix}/sign-up`, data),

  // lots
  fetchLots: () => httpClient.get(`${prefix}/lots`),
  fetchLot: ({lotId}: any) => httpClient.get(`${prefix}/lots/${lotId}`),
  createNewLot: (newLot: LotCreateInterface) => httpClient.post(`${prefix}/lots`, newLot),
  // user
  fetchProfile: () => httpClient.get(`${prefix}/users/profile`),
  createUser: (newUser: userCreateInterface) => httpClient.post(`${prefix}/users`, newUser),
  //
  login: ({ loginData }: any) => httpClient.post(`${prefix}/users/login`, loginData),
};
