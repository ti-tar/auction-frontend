import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import OrderForm, { OrderFormValues } from "../../components/form/orderForm";
import { toast } from "react-toastify";
import * as ordersActions from "../../domain/orders/actions";
import * as lotsActions from "../../domain/lots/actions";
import { StateInterface } from "../../domain";
import { OrderActionType } from "../../interfaces/actionTypes";
import { RouteComponentProps } from "react-router";
import { getWinnersBid } from "../../libs/helpers";

interface Props {
  match: {
    params: {
      lotId: string;
    };
  };
}

const OrderEdit: React.FC<Props & RouteComponentProps> = props => {
  const {
    match: {
      params: { lotId }
    },
    history
  } = props;

  const { resource: lot } = useSelector((state: StateInterface) => state.lots);

  const [order, setOrder] = useState({});

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch({ type: lotsActions.fetchLot.request, payload: { lotId } });
  }, [dispatch, lotId]);

  useEffect(() => {
    if (lot.bids && lot.bids.length) {
      const winnersBid = getWinnersBid(lot.bids);
      if (!!winnersBid && winnersBid.order) {
        setOrder(winnersBid.order);
      }
    }
  }, [lot.id, lot.bids]);

  const handleOnSubmit = (formValues: OrderFormValues) => {
    if (!formValues.arrivalLocation || formValues.type === "pending") {
      toast.error("fill / select all fields");
      return;
    }

    if (Object.keys(order).length) {
      dispatch<OrderActionType>({
        type: ordersActions.updateOrder.request,
        payload: { lotId: parseInt(lotId, 10), order: formValues },
        history
      });
    } else {
      dispatch<OrderActionType>({
        type: ordersActions.createOrder.request,
        payload: { lotId: parseInt(lotId, 10), order: formValues },
        history
      });
    }
  };

  return (
    <section className="orders">
      <div className="title">OrderDetails</div>
      <div className="fromWrapper">
        <OrderForm onSubmit={handleOnSubmit} initialValues={order} />
      </div>
    </section>
  );
};

export default OrderEdit;
