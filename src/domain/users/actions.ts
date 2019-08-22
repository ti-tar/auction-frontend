import { getAction } from '../../libs/actions';

export const fetchUsers = getAction('users/FETCH_USERS');
export const createNewUser = getAction('users/CREATE_USER');