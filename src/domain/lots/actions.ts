import { getAction } from "../../libs/actions";

export const fetchLots = getAction("lots/FETCH_LOTS");
export const fetchLot = getAction("lots/FETCH_LOT");
export const resetLot = getAction("lots/RESET_LOT");
export const createNewLot = getAction("lots/CREATE_LOT");
export const updateLot = getAction("lots/UPDATE_LOT");
export const deleteLot = getAction("lots/DELETE_LOT");
