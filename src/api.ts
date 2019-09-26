import axios from "axios/index";
import qs from "qs";
// utils
import { getStorageItem } from "./libs/storage";
// interfaces
import LotCreateInterface from "./interfaces/lotCreate";
import userCreateInterface from "./interfaces/userCreate";

const getAxiosInstance = () =>
  axios.create({
    baseURL: process.env.REACT_APP_API_URL,
    // withCredentials: true,
    withCredentials: false,
    paramsSerializer: params =>
      qs.stringify(params, {
        encode: false,
        skipNulls: true,
        arrayFormat: "brackets"
      })
  });

const httpClient = getAxiosInstance();

httpClient.interceptors.request.use(
  config => ({
    ...config,
    headers: {
      Authorization: `Bearer ${getStorageItem("token")}`,
      ...config.headers
    }
  }),
  err => Promise.reject(err)
);

const prefix = "/api";

export default {
  // lots
  fetchLots: () => httpClient.get(`${prefix}/lots`),
  fetchOwnLots: () => httpClient.get(`${prefix}/lots/own/lots`),
  fetchLotsWithBids: () => httpClient.get(`${prefix}/lots/own/bids`),
  fetchLot: ({ lotId }: any) => httpClient.get(`${prefix}/lots/${lotId}`),
  createNewLot: (newLot: LotCreateInterface) =>
    httpClient.post(`${prefix}/lots`, newLot),
  updateLot: ({ updatedLot, lotId }: any) =>
    httpClient.put(`${prefix}/lots/${lotId}`, updatedLot),
  deleteLot: (lotId: string) => httpClient.delete(`${prefix}/lots/${lotId}`),

  // bids
  fetchBids: ({ lotId }: { lotId: number }) =>
    httpClient.get(`${prefix}/lots/${lotId}/bids`),
  createBid: ({ newBid, lotId }: any) =>
    httpClient.post(`${prefix}/lots/${lotId}/bids`, newBid),

  // user
  fetchProfile: () => httpClient.get(`${prefix}/users/profile`),
  createUser: (newUser: userCreateInterface) =>
    httpClient.post(`${prefix}/auth/signup`, newUser),

  // auth
  login: ({ loginData }: any) =>
    httpClient.post(`${prefix}/auth/login`, loginData),
  verifyEmail: (sendData: object) =>
    httpClient.post(`${prefix}/auth/verify/email`, sendData),
  forgotPassword: (sendData: object) =>
    httpClient.post(`${prefix}/auth/forgot_password`, sendData),
  resetPassword: (sendData: object) =>
    httpClient.post(`${prefix}/auth/reset_password`, sendData)
};
