import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import * as ordersActions from "./../../domain/orders/actions";
import { StateInterface } from "../../domain";

import "./styles/ordersStyles.scss";

interface Props {}

const Orders: React.FC<Props> = props => {
  const dispatch = useDispatch();

  const orders = useSelector((state: StateInterface) => state.orders.resources);

  useEffect(() => {
    dispatch({ type: ordersActions.fetchOrders.request });
  }, [dispatch]);

  return (
    <section className="orders">
      <h1>Orders</h1>
      {orders.map(order => (
        <div key={order.id} className="order">
          <h6>{order.id} </h6>
          <p>
            location: {order.arrivalLocation}
            <br />
            type: {order.type}
            <br />
            status: {order.status}
            <br />
          </p>
        </div>
      ))}
    </section>
  );
};

export default Orders;
