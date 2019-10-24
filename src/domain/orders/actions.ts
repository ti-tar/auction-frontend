import { getAction } from "../../libs/actions";

export const fetchOrders = getAction("orders/FETCH_ORDERS");
export const fetchOrder = getAction("orders/FETCH_ORDER");
export const createOrder = getAction("orders/CREATE_ORDER");
export const updateOrder = getAction("orders/UPDATE_ORDER");
