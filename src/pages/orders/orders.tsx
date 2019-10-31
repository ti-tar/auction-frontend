import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import * as ordersActions from "./../../domain/orders/actions";
import { StateInterface } from "../../domain";

import "./styles/ordersStyles.scss";
import { Link, NavLink, RouteComponentProps } from "react-router-dom";
import { FetchOrdersActionType } from "../../interfaces/actionTypes";

interface Props {
  match: {
    params: {
      filters: string | undefined;
    };
  };
}

const Orders: React.FC<Props & RouteComponentProps> = ({
  match: {
    params: { filters }
  }
}) => {
  const dispatch = useDispatch();

  const orders = useSelector((state: StateInterface) => state.orders.resources);

  useEffect(() => {
    dispatch<FetchOrdersActionType>({ type: ordersActions.fetchOrders.request, payload: { filters } });
  }, [dispatch, filters]);

  return (
    <section className="orders">
      <ul className="ordersNav">
        <li>
          <NavLink to={{ pathname: "/orders", search: "" }} exact>
            My orders
          </NavLink>
        </li>
        <li>
          <NavLink to={{ pathname: "/orders/mylots" }} exact>
            Orders My Lots
          </NavLink>
        </li>
      </ul>
      {orders.map(order => (
        <div key={order.id} className="order">
          <h3>
            orderId: #{order.id}
            {"  "}
            {!!order.bid.lot && (
              <Link to={{ pathname: `/lots/${order.bid.lot.id}` }}>
                {order.bid.lot.title} (id: {order.bid.lot.id})
              </Link>
            )}{" "}
          </h3>
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
