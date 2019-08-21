import { getAction } from '../../libs/actions';

export const fetchLots = getAction('lots/FETCH_LOTS');
export const createNewLot = getAction('lots/CREATE_LOT');