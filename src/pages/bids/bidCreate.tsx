import React from "react";
import { useDispatch } from "react-redux";
import { InjectedFormProps } from "redux-form";
import { RouteComponentProps, withRouter } from "react-router";
import { toast } from "react-toastify";
import * as bidActions from "../../domain/bids/actions";
import "./bidCreateStyles.scss";

import BidFormExp, { BidFormData } from "../../components/form/bidForm";

interface Props {
  match: {
    params: {
      lotId: string;
    };
  };
}

const BidCreate: React.FC<
  Props & RouteComponentProps & InjectedFormProps<BidFormData>
> = props => {
  const {
    history,
    match: {
      params: { lotId }
    }
  } = props;

  const dispatch = useDispatch();
  const handleBeforeSubmit = (formValues: BidFormData): void => {
    if (!formValues.proposedPrice) {
      toast.error("fill the price field");
      return;
    }
    dispatch({
      type: bidActions.createBid.request,
      payload: {
        lotId,
        newBid: {
          proposedPrice: parseFloat(formValues.proposedPrice)
        }
      },
      history
    });
  };

  return (
    <section className="bidCreate">
      <div className="title">Create bid</div>
      <div className="fromWrapper">
        <BidFormExp onSubmit={handleBeforeSubmit} />
      </div>
    </section>
  );
};

export default withRouter(BidCreate);
