import axios from 'axios/index';
import qs from 'qs';

// interfaces
import LotCreateInterface from './interfaces/lotCreate';

const getAxiosInstance = () => axios.create({
  baseURL: process.env.REACT_APP_API_URL,
  // withCredentials: true,
  withCredentials: false,
  paramsSerializer: params => qs.stringify(params, { encode: false, skipNulls: true, arrayFormat: 'brackets' }),
});

const httpClient = getAxiosInstance();

// const prefix = '/api/v1';
const prefix = '/api';

export default {
  //signIn: ({ data }) => httpClient.post(`${prefix}/sign-in`, data),
  //signUp: ({ data }) => httpClient.post(`${prefix}/sign-up`, data),

  // lots
  fetchLots: () => httpClient.get(`${prefix}/lots`),
  createNewLot: (newLot: LotCreateInterface) => httpClient.post(`${prefix}/lots`, newLot),
  // users
  fetchUsers: () => httpClient.get(`${prefix}/users`),

};
