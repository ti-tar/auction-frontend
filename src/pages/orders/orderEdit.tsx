import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { InjectedFormProps } from "redux-form";
import OrderForm, { OrderFormValues } from "../../components/form/orderForm";
import { toast } from "react-toastify";
import * as ordersActions from "../../domain/orders/actions";
import * as lotsActions from "../../domain/lots/actions";
import { StateInterface } from "../../domain";
import { OrderActionType } from "../../interfaces/actionTypes";
import { RouteComponentProps } from "react-router";

interface Props {
  match: {
    params: {
      lotId: string;
    };
  };
}

const OrderEdit: React.FC<
  Props & InjectedFormProps<{}, {}> & RouteComponentProps
> = props => {
  const {
    match: {
      params: { lotId }
    },
    history
  } = props;

  const { resource: lot, isLoading } = useSelector(
    (state: StateInterface) => state.lots
  );
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch({ type: lotsActions.fetchLot.request, payload: { lotId } });
  }, [dispatch]);

  const handleOnSubmit = (formValues: OrderFormValues) => {
    if (!formValues.arrivalLocation || formValues.type === "pending") {
      toast.error("fill / select all fields");
      return;
    }

    dispatch<OrderActionType>({
      type: ordersActions.createOrder.request,
      payload: { lotId: parseInt(lotId, 10), order: formValues },
      history
    });

    // if (lotId) {
    //   dispatch({
    //     type: ordersActions.updateOrder.request,
    //     payload: { lotId, lot: formValues }
    //   });
    // } else {
    //   dispatch({
    //     type: ordersActions.createOrder.request,
    //     payload: { lot: formValues }
    //   });
    // }
  };

  return (
    <section className="orders">
      <div className="title">OrderDetails</div>
      <div className="fromWrapper">
        <OrderForm onSubmit={handleOnSubmit} />
      </div>
    </section>
  );
};

export default OrderEdit;
