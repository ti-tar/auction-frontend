import React, { useEffect } from "react";
import { connect } from "react-redux";
import moment from "moment";
import { Link } from "react-router-dom";

// actions
import * as lotsActions from "../../domain/lots/actions";

// interface
import LotInterface from "../../interfaces/lot";
import lotsReducerInterface from "../../interfaces/lotsReducer";
import userReducerInterface from "../../interfaces/userReducer";

import "./styles/lotsStyles.scss";
import Pagination from "../../components/pagination/pagination";

interface Props {
  lots: LotInterface[];
  userId: number;
  isLoading: boolean;
  fetchLots: Function;
  match: any;
  subContainerClassName?: string;
}

const Lots = (props: Props) => {
  const {
    match: { url },
    userId,
    fetchLots,
    isLoading,
    lots
  } = props;

  const getFilter = (url: string) => {
    switch (url) {
      case "/lots/own/lots":
        return "ownLots";
      case "/lots/own/bids":
        return "ownBids";
      default:
        return "all";
    }
  };

  useEffect(() => {
    fetchLots({ filter: getFilter(url) });
  }, [fetchLots, url]);

  return (
    <section className="lots">
      {!isLoading && lots.length > 0 && (
        <>
          {props.lots.map((lot: LotInterface) => (
            <div className="lot" key={`${lot.id} ${lot.title}`}>
              <div className="lot__img">
                {userId === lot.user.id && (
                  <div className="your_lot">Your lot</div>
                )}
                <div className="image_place">
                  <img
                    src={`${process.env.REACT_APP_STATIC_API_URL}/images/lots/thumb/${lot.image}`}
                    alt={lot.title}
                  />
                </div>
              </div>
              <div className="lot__product">
                <h3>
                  <Link to={{ pathname: `/lots/${lot.id}` }}>{lot.title}</Link>
                </h3>
                <p>{lot.description}</p>

                <p>
                  <u>Status:</u> {lot.status}
                </p>

                <p>
                  <u>Owner:</u>
                  <br />
                  {lot.user.firstName}
                  <br />
                  {lot.user.email}
                  <br />
                </p>
              </div>
              <div className="lot__info">
                <div>
                  <span>Current Price</span>
                  <span>{lot.currentPrice} $</span>
                </div>
                <div>
                  <span>Estimated Price</span>
                  <span>{lot.estimatedPrice} $</span>
                </div>
                <div>
                  <span>Start Time</span>
                  <span>
                    {moment(lot.startTime).format("DD MMM YY, hh:mm:ss")}
                  </span>
                </div>
                <div>
                  <span>End Time</span>
                  <span>
                    {moment(lot.endTime).format("DD MMM YY, hh:mm:ss")}
                  </span>
                </div>
              </div>
            </div>
          ))}

          <Pagination
            total={lots.length}
            perPage={4}
            current={1}
            onClickHandle={() => {}}
          />
        </>
      )}

      {!props.isLoading && props.lots.length === 0 && (
        <h1> you have no lots yet</h1>
      )}
    </section>
  );
};

const LotsComponentResponse = connect(
  (state: { lots: lotsReducerInterface; user: userReducerInterface }) => ({
    userId: state.user.id,
    lots: state.lots.resources,
    lotsMeta: state.lots.meta,
    isLoading: state.lots.isLoading
  }),
  {
    fetchLots: (data: any): any => ({
      type: lotsActions.fetchLots.request,
      payload: { filter: data.filter }
    })
  }
)(Lots);

export default LotsComponentResponse;
