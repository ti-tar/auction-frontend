import React, { useEffect } from "react";
import { connect } from "react-redux";
import moment from "moment";
import { compose } from "redux";
import { withRouter } from "react-router";

// actions
import * as lotsActions from "../../domain/lots/actions";
import * as bitsActions from "../../domain/bids/actions";

// interface
import lotInterface from "../../interfaces/lot";
import lotsReducerInterface from "../../interfaces/lotsReducer";
import userReducerInterface from "../../interfaces/userReducer";
import bidsReducerInterface from "../../interfaces/bidReducer";

import "./styles/lotDetailsStyles.scss";
import * as H from "history";

import { Link } from "react-router-dom";

type PathParamsType = {
  id: string;
};

interface Props {
  lot: lotInterface;
  userId: number;
  bids: any;
  isLoading: boolean;
  bidsTotal: number;
  fetchLot: Function;
  fetchBids: Function;
  deleteLot: Function;

  history: H.History;
  location: H.Location<H.LocationState>;
  match: {
    params: {
      id: string;
    };
  };
  staticContext?: any;
}

const LotDetails: React.FC<Props> = props => {
  const {
    lot,
    fetchLot,
    fetchBids,
    deleteLot,
    match: {
      params: { id: lotId }
    },
    isLoading,
    userId,
    bids,
    bidsTotal,
    history
  } = props;

  useEffect(() => {
    fetchLot(lotId);
    fetchBids(lotId);
  }, [fetchLot, fetchBids, lotId]);

  return (
    <section className="lotDetails">
      {!!lot && (
        <div className="lot" key={`${lot.id} ${lot.title}`}>
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
            <h3>{lot.title}</h3>
            <p>{lot.description}</p>
            <p>
              <u>Status:</u> {lot.status}
            </p>

            {!!lot.user && (
              <p>
                <u>Owner:</u>
                <br />
                {lot.user.firstName}
                <br />
                {lot.user.email}
                <br />
              </p>
            )}
          </div>
          <div className="lot__info">
            <div>
              <span>Current Price: </span> <span>${lot.currentPrice}</span>
            </div>
            <div>
              <span>Estimated Price: </span> <span>${lot.estimatedPrice}</span>
            </div>
            <div>
              <span>Start Time</span>
              <span>
                {moment(lot.startTime).format("DD MMM YYYY, hh:mm:ss")}
              </span>
            </div>
            <div>
              <span>End Time</span>
              <span>{moment(lot.endTime).format("DD MMM YYYY, hh:mm:ss")}</span>
            </div>

            {!isLoading && !!lot && lot.id && userId === lot.user.id ? (
              !isLoading &&
              !!lot.user &&
              userId === lot.user.id && (
                <>
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
                        deleteLot(lotId, history);
                      }
                    }}
                  >
                    Delete a lot
                  </button>
                </>
              )
            ) : (
              <Link
                className="lot_options_make_bid_button"
                to={{ pathname: `/lots/${lot.id}/make_bid` }}
              >
                Make a bid
              </Link>
            )}
          </div>
        </div>
      )}

      {isLoading && <h1>Loading..</h1>}

      <div>
        <h2>Bids</h2>
        {!!bids &&
          !!bids.length &&
          bids.map((bid: any) => (
            <div key={bid.proposedPrice} style={{ margin: "2em 0" }}>
              <div>
                {bid.user ? (
                  <>
                    <u>{bid.user.firstName}</u> at{" "}
                    {moment(bid.bidCreationTime).format("DD MMM YY, hh:mm:ss")}
                  </>
                ) : (
                  "user error"
                )}
              </div>
              <p>Proposed Price: ${bid.proposedPrice}</p>
            </div>
          ))}
        <div>Total bids: {bidsTotal}</div>
      </div>
    </section>
  );
};

const lotDetailsRoute: any = compose(
  connect(
    (state: {
      lots: lotsReducerInterface;
      user: userReducerInterface;
      bids: bidsReducerInterface;
    }) => ({
      lot: state.lots.resource,
      userId: state.user.id,
      bids: state.bids.resources,
      bidsTotal: state.bids.meta.total,
      isLoading: state.lots.isLoading
    }),
    {
      fetchLot: (lotId: string): any => ({
        type: lotsActions.fetchLot.request,
        payload: { lotId }
      }),
      fetchBids: (lotId: string): any => ({
        type: bitsActions.fetchBids.request,
        payload: { lotId }
      }),
      deleteLot: (lotId: string, history: Function): any => ({
        type: lotsActions.deleteLot.request,
        payload: { lotId },
        history
      })
    }
  ),
  withRouter
)(LotDetails);

export default lotDetailsRoute;
