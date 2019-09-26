import { getAction } from "../../libs/actions";

export const fetchProfile = getAction("user/FETCH_PROFILE");
export const createNewUser = getAction("user/CREATE_USER");
export const login = getAction("user/LOGIN");
export const verifyEmail = getAction("user/VERIFY_EMAIL");

export const logout = getAction("user/LOGOUT");
export const forgotPassword = getAction("user/FORGOT_PASSWORD");
export const resetPassword = getAction("user/RESET_PASSWORD");

export const setUserFromLocalStorage = getAction("lots/SET_USER_FROM_STORAGE");
