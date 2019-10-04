import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import moment from "moment";
import { Link } from "react-router-dom";
import { RouteComponentProps } from 'react-router-dom';
import * as lotsActions from "../../domain/lots/actions";
import { StateInterface } from "../../domain";
import "./styles/lotsStyles.scss";

const Lots: React.FunctionComponent<RouteComponentProps> = props => {
  const { match: { url }} = props;

  const lots = useSelector((state: StateInterface) => state.lots.resources);
  const isLoading = useSelector((state: StateInterface) => state.lots.isLoading);
  const userId = useSelector((state: StateInterface) => state.user.id);

  const dispatch = useDispatch();

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
    dispatch({ type: lotsActions.fetchLots.request, payload: { filter: getFilter(url) } });
  }, [dispatch, url]);

  return (
    <section className="lots">
      {!isLoading && !!lots && lots.map((lot) => (
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
              <h3><Link to={{ pathname: `/lots/${lot.id}` }}>{lot.title}</Link></h3>
              <p>{lot.description}</p>

              <p>
                <u>Status:</u>
                {lot.status}
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

      {!isLoading && lots.length === 0 && (
        <h1> you have no lots yet</h1>
      )}
    </section>
  );
};

export default Lots;