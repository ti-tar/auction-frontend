import axios from 'axios/index';
import qs from 'qs';
// utils
import { getStorageItem } from './libs/storage';
// interfaces
import LotCreateInterface from './interfaces/lotCreate';
import userCreateInterface from './interfaces/userCreate';

import { clearStorage } from './libs/storage';
import {toast} from "./libs/helpers";

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

// httpClient.interceptors.response.use((response) => {
//   return response;
// }, (error) => {
//   if (401 === error.response.status) {
//     // todo - unloging
//     clearStorage();
//     toast('Not authorized! Login.')
//   }
// });

// const prefix = '/api/v1';
const prefix = '/api';

export default {
  //signIn: ({ data }) => httpClient.post(`${prefix}/sign-in`, data),
  //signUp: ({ data }) => httpClient.post(`${prefix}/sign-up`, data),

  // lots
  fetchLots: () => httpClient.get(`${prefix}/lots`),
  fetchOwnLots: () => httpClient.get(`${prefix}/lots/own`),
  fetchLot: ({lotId}: any) => httpClient.get(`${prefix}/lots/${lotId}`),
  createNewLot: (newLot: LotCreateInterface) => httpClient.post(`${prefix}/lots`, newLot),
  updateLot: ({updatedLot, lotId}: any) => httpClient.put(`${prefix}/lots/${lotId}`, updatedLot),
  deleteLot: (lotId: string) => httpClient.delete(`${prefix}/lots/${lotId}`),

  // bids
  fetchBids: ({ lotId }: { lotId: number }) => httpClient.get(`${prefix}/lots/${lotId}/bids`),
  createBid: ({ newBid, lotId }: any) => httpClient.post(`${prefix}/lots/${lotId}/bids`, newBid),
  // user
  fetchProfile: () => httpClient.get(`${prefix}/users/profile`),
  createUser: (newUser: userCreateInterface) => httpClient.post(`${prefix}/auth/signin`, newUser),
  //
  login: ({ loginData }: any) => httpClient.post(`${prefix}/auth/login`, loginData),
};
