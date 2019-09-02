import { getAction } from '../../libs/actions';

export const fetchProfile = getAction('user/FETCH_PROFILE');
export const createNewUser = getAction('user/CREATE_USER');
export const login = getAction('user/LOGIN');

export const setUserFromLocalStorage = getAction('lots/SET_USER_FROM_STORAGE');