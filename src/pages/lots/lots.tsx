import React, { useEffect } from "react";
import { connect } from "react-redux";
import moment from "moment";
import { Link } from "react-router-dom";
import { RouteComponentProps } from 'react-router-dom';

// actions
import * as lotsActions from "../../domain/lots/actions";

// interface
import LotInterface from "../../interfaces/lot";

import "./styles/lotsStyles.scss";

interface Props {
  lots: LotInterface[];
  userId: number;
  isLoading: boolean;
  fetchLots: Function;
  match: any;
}

const Lots: React.FunctionComponent<Props & RouteComponentProps> = props => {
  const {
    match: { url },
    userId,
    fetchLots,
    isLoading, 
    lots,
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
      {!isLoading && lots.length > 0 && lots.map((lot: LotInterface) => (
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
                <span>{moment(lot.endTime).format("DD MMM YY, hh:mm:ss")}</span>
              </div>
            </div>
          </div>
        ))}

      {!props.isLoading && props.lots.length === 0 && (
        <h1> you have no lots yet</h1>
      )}
    </section>
  );
};

export default connect<React.FC<Props> & any>(
  (state: any) => ({
    userId: state.user.id,
    lots: state.lots.resources,
    isLoading: state.lots.isLoading
  }),
  {
    fetchLots: (data: any): any => ({
      type: lotsActions.fetchLots.request,
      payload: { filter: data.filter }
    })
  }
)(Lots);
