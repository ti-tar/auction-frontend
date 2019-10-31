import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { InjectedFormProps } from "redux-form";
import { RouteComponentProps, withRouter } from "react-router";
import { toast } from "react-toastify";
import * as bidActions from "../../domain/bids/actions";
import "./bidCreateStyles.scss";

import BidFormExp, { BidFormData } from "../../components/form/bidForm";
import { CreateBidActionType } from "../../interfaces/actionTypes";
import * as lotsActions from "../../domain/lots/actions";
import { StateInterface } from "../../domain";
import { Link } from "react-router-dom";
import { getWinnersBid } from "../../libs/helpers";

interface Props {
  match: {
    params: {
      lotId: string;
    };
  };
}

const BidCreate: React.FC<Props & RouteComponentProps & InjectedFormProps<BidFormData>> = ({
  history,
  match: {
    params: { lotId }
  }
}) => {
  const dispatch = useDispatch();
  const lot = useSelector((state: StateInterface) => state.lots.resource);
  useEffect(() => {
    dispatch({ type: lotsActions.fetchLot.request, payload: { lotId } });
  }, [dispatch, lotId]);
  const handleBeforeSubmit = (formValues: BidFormData): void => {
    if (!formValues.proposedPrice) {
      toast.error("fill the price field");
      return;
    }

    dispatch<CreateBidActionType>({
      type: bidActions.createBid.request,
      payload: { lotId, newBid: { proposedPrice: formValues.proposedPrice } },
      history
    });
  };
  const winnersBid = getWinnersBid(lot.bids);
  return (
    <section className="bidCreate">
      <div className="lotInfo">
        {!!lot && (
          <h2>
            <Link to={{ pathname: `/lots/${lot.id}` }}>Lot '{lot.title}'</Link>
          </h2>
        )}
        {!!lot && (
          <>
            <p>Max current price: ${!!winnersBid ? winnersBid.proposedPrice : lot.currentPrice}</p>
            <p>Estimated price: ${lot.estimatedPrice}</p>
          </>
        )}
      </div>
      <div className="title">Create Bid</div>
      <div className="fromWrapper">
        <BidFormExp onSubmit={handleBeforeSubmit} />
      </div>
    </section>
  );
};

export default withRouter(BidCreate);
