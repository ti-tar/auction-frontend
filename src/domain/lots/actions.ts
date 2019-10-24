import { getAction } from "../../libs/actions";

export const fetchLots = getAction("lots/FETCH_LOTS");
export const fetchLot = getAction("lots/FETCH_LOT");
export const createLot = getAction("lots/CREATE_LOT");
export const updateLot = getAction("lots/UPDATE_LOT");
export const deleteLot = getAction("lots/DELETE_LOT");
export const setLot = getAction("lots/SET_LOT");
