import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import moment from "moment";
import * as lotsActions from "../../domain/lots/actions";
import * as bitsActions from "../../domain/bids/actions";
import { Link, RouteComponentProps } from "react-router-dom";
import { StateInterface } from "../../domain";

import "./styles/lotDetailsStyles.scss";
import BidsInterface from "../../interfaces/bid";
import { getWinnersBid } from "../../libs/helpers";
import OrderInterface from "../../interfaces/order";

interface Props {
  match: {
    params: {
      id: string;
    };
  };
}

const LotDetails: React.FC<Props & RouteComponentProps> = props => {
  const {
    match: {
      params: { id: lotId }
    },
    history
  } = props;
  const [order, setOrder] = useState<OrderInterface>();
  const { isLoading, resource: lot } = useSelector(
    (state: StateInterface) => state.lots
  );
  const userId = useSelector((state: StateInterface) => state.user.id);
  const { resources: bids } = useSelector(
    (state: StateInterface) => state.bids
  );
  const bidsTotal = useSelector(
    (state: StateInterface) => state.bids.meta.total
  );

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch({ type: lotsActions.fetchLot.request, payload: { lotId } });
    dispatch({ type: bitsActions.fetchBids.request, payload: { lotId } });
  }, [dispatch, lotId]);

  const setLot = (lotId: string) => {
    dispatch({ type: lotsActions.setLot.request, payload: { lotId }, history });
  };
  const deleteLot = (lotId: string) =>
    dispatch({
      type: lotsActions.deleteLot.request,
      payload: { lotId },
      history
    });

  const [isWinner, setIsWinner] = useState(false);
  useEffect(() => {
    if (lot.bids && lot.bids.length) {
      const winnersBid = getWinnersBid(lot.bids);
      if (!!winnersBid) {
        setIsWinner(winnersBid.user.id === userId);
        setOrder(winnersBid.order);
      }
    }
  }, [lot]);

  return (
    <section className="lotDetails">
      {!!lot && (
        <div className="lot">
          <div className="lot__img">
            <div>
              {lot.image && (
                <img
                  src={`${process.env.REACT_APP_STATIC_API_URL}/images/lots/thumb/${lot.image}`}
                  alt=""
                />
              )}
            </div>
          </div>
          <div className="lot__product">
            {lot.user && lot.user.id !== userId && lot.status === "closed" && (
              <div className="winnerStatus">
                {isWinner ? "You are the Winner" : "You are not the winner"}
              </div>
            )}
            <h3>
              {lot.title} ({lot.status})
            </h3>
            <>
              <h6>Description:</h6>
              <p>{lot.description}</p>
            </>

            {!!lot.user && (
              <>
                <h6>Owner:</h6>
                <p>
                  {lot.user.firstName}, {lot.user.email}
                </p>
              </>
            )}
          </div>
          <div className="lot__info">
            <div className="lot__details">
              <div>
                <span>Current Price: </span> <span>${lot.currentPrice}</span>
              </div>
              <div>
                <span>Estimated Price: </span>{" "}
                <span>${lot.estimatedPrice}</span>
              </div>
              <div>
                <span>End Time</span>
                <span>
                  {moment(lot.endTime).format("DD MMM YYYY, hh:mm:ss")}
                </span>
              </div>
            </div>

            {!isLoading && !!lot && lot.id && userId === lot.user.id ? (
              !isLoading &&
              !!lot.user &&
              userId === lot.user.id &&
              lot.status === "pending" && (
                <div className="lot_options">
                  <small>
                    You may change or delete lot, lot is not processed until you
                    push "Set the lot" button. After that you won't change
                    anything.
                  </small>
                  <button
                    className="lot_options_set_lot_button"
                    onClick={() => {
                      if (
                        window.confirm(
                          `Set Lot to Auction? You won't be able to edit or delete it`
                        )
                      ) {
                        setLot(lotId);
                      }
                    }}
                  >
                    Set the lot
                  </button>
                  <Link
                    className="lot_options_edit_lot_button"
                    to={{ pathname: `/lots/${lot.id}/edit` }}
                  >
                    Update a lot
                  </Link>
                  <button
                    className="lot_options_delete_lot_button"
                    onClick={() => {
                      if (
                        window.confirm(
                          `Are you confirm you wont to delete lot ${lotId}`
                        )
                      ) {
                        deleteLot(lotId);
                      }
                    }}
                  >
                    Delete a lot
                  </button>
                </div>
              )
            ) : lot.status === "inProcess" ? (
              <div className="lot_options">
                <Link
                  className="lot_options_make_bid_button"
                  to={{ pathname: `/lots/${lot.id}/make_bid` }}
                >
                  Make a bid
                </Link>
              </div>
            ) : lot.status === "closed" && isWinner ? (
              <div className="lot_options">
                <Link
                  className="lot_options_checkout_button"
                  to={{ pathname: `/lots/${lot.id}/order` }}
                >
                  {!!order ? "Edit Order" : "Checkout"}
                </Link>
              </div>
            ) : (
              ""
            )}
          </div>
          {!!order && (
            <div className="lot__order">
              <div className="lot__order_item">
                <h4>Order</h4>
              </div>
              <div className="lot__order_item">
                <h4>Status:</h4>
                <p>{order.status}</p>
              </div>
              <div className="lot__order_item">
                <h4>Arrival type:</h4>
                <p>{order.type}</p>
              </div>
              <div className="lot__order_item arrival_location">
                <h4>Arrival location:</h4>
                <p>{order.arrivalLocation}</p>
              </div>
            </div>
          )}
        </div>
      )}

      {isLoading && <h1>Loading..</h1>}

      <div className="lotBids">
        <h2>Bids</h2>

        <div className="table">
          <div className="row head">
            <div className="id"> </div>
            <div className="customer">Customer</div>
            <div className="proposition">Proposition</div>
            <div className="time">Time</div>
          </div>
          {!!bids &&
            !!bids.length &&
            bids.map((bid: BidsInterface) => (
              <div key={bid.proposedPrice} className="row">
                <div className="id"> </div>
                <div className="customer">
                  {bid.user ? bid.user.firstName : ""}
                </div>
                <div className="proposition">{bid.proposedPrice}</div>
                <div className="time">
                  {moment(bid.bidCreationTime).format("DD MMM YY, hh:mm:ss")}
                </div>
              </div>
            ))}
        </div>

        <div className="total">Total bids: {bidsTotal}</div>
      </div>
    </section>
  );
};

export default LotDetails;
