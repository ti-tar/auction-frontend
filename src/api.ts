import axios from "axios/index";
import qs from "qs";
// utils
import { getStorageItem } from "./libs/storage";
// interfaces
import { OrderFormValues } from "./components/form/orderForm";
import { BidFormData } from "./components/form/bidForm";
import { UserCreateInterface } from "./components/form/signupForm";
import { LoginInterface } from "./components/form/loginForm";
import { LotFormValues } from "./components/form/lotForm";

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
  fetchLots: ({ page }: { page: number }) => httpClient.get(`${prefix}/lots?page=${page}`),
  fetchOwnLots: ({ page }: { page: number }) => httpClient.get(`${prefix}/lots/own/lots?page=${page}`),
  fetchLotsWithBids: ({ page }: { page: number }) => httpClient.get(`${prefix}/lots/own/bids?page=${page}`),
  fetchLot: ({ lotId }: { lotId: number }) => httpClient.get(`${prefix}/lots/${lotId}`),
  createLot: ({ newLot }: { newLot: LotFormValues }) => httpClient.post(`${prefix}/lots`, newLot),
  updateLot: ({ updatedLot, lotId }: { updatedLot: LotFormValues; lotId: number }) =>
    httpClient.put(`${prefix}/lots/${lotId}`, updatedLot),
  deleteLot: ({ lotId }: { lotId: number }) => httpClient.delete(`${prefix}/lots/${lotId}`),
  setLot: ({ lotId }: { lotId: number }) => httpClient.put(`${prefix}/lots/${lotId}/set`),
  uploadLotCover: ({ formData }: any) => httpClient.post(`${prefix}/lots/upload`, formData),

  // executeOrder
  executeOrder: ({ lotId }: { lotId: number }) => httpClient.post(`${prefix}/lots/${lotId}/executeOrder`, {}),
  // receiveOrder
  receiveOrder: ({ lotId }: { lotId: number }) => httpClient.post(`${prefix}/lots/${lotId}/receiveOrder`, {}),

  // orders
  fetchOrders: () => httpClient.get(`${prefix}/orders`),
  fetchOrder: ({ orderId }: { orderId: number }) => httpClient.get(`${prefix}/orders/${orderId}`),
  createOrder: ({ lotId, order }: { lotId: number; order: OrderFormValues }) =>
    httpClient.post(`${prefix}/lots/${lotId}/order`, order),
  updateOrder: ({ lotId, order }: { lotId: number; order: OrderFormValues }) =>
    httpClient.put(`${prefix}/lots/${lotId}/order`, order),

  // bids
  fetchBids: ({ lotId }: { lotId: number }) => httpClient.get(`${prefix}/lots/${lotId}/bids`),
  createBid: ({ lotId, newBid }: { lotId: number; newBid: BidFormData }) =>
    httpClient.post(`${prefix}/lots/${lotId}/bids`, newBid),

  // user
  fetchProfile: () => httpClient.get(`${prefix}/users/profile`),
  createUser: ({ newUser }: { newUser: UserCreateInterface }) => httpClient.post(`${prefix}/auth/signup`, newUser),

  // auth
  login: ({ loginData }: { loginData: LoginInterface }) => httpClient.post(`${prefix}/auth/login`, loginData),
  verifyEmail: ({ token }: { token: string }) => httpClient.post(`${prefix}/auth/verify/email`, { token }),
  forgotPassword: ({ email }: { email: string }) => httpClient.post(`${prefix}/auth/forgot_password`, { email }),
  resetPassword: (sendData: object) => httpClient.post(`${prefix}/auth/reset_password`, sendData)
};
