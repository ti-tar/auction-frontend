import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import moment from 'moment';
import { Link } from 'react-router-dom';

// actions
import  * as lotsActions from '../../domain/lots/actions';

// interface
import lotInterface from '../../interfaces/lot';
import lotsReducerInterface from '../../interfaces/lotsReducer';

import "./styles/lotsStyles.scss";


interface Props {
  lots: lotInterface[],
  isLoading: boolean,
  fetchLots: Function,
  match: any
}


const Lots: React.FunctionComponent<Props> = (props) => {
  const { match: { url } } = props;
  const own = undefined;
  useEffect(() => {
    props.fetchLots({ owner: url === "/lots/own" ? 'own' : 'all' });
  }, [url]);

  return (
    <section className="lots">
      {!props.isLoading && props.lots.length > 0 && props.lots.map((lot:lotInterface) => (
        <div className="lot" key={`${lot.id} ${lot.title}`}>
          <div className="lot__img">
            <div>
              {lot.image}
            </div>
          </div>
          <div className="lot__product">
            <h3>
              <Link to={{ pathname: `/lots/${lot.id}`}}>
                {lot.title}
              </Link>
            </h3>
            <p>
              {lot.description}
            </p>

            <p>
              <u>Status:</u> {lot.status}
            </p>

            <p>
              <u>Owner:</u><br />
              {lot.user.firstName}<br />
              {lot.user.email}<br />
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
                      {moment(lot.startTime).format('DD MM YYYY hh:mm:ss')}
                  </span>
              </div>
              <div>
                  <span>End Time</span>
                  <span>
                      {moment(lot.endTime).format('DD MM YYYY hh:mm:ss')}
                  </span>
              </div>

          </div>
        </div>
      ))}

      {!props.isLoading && props.lots.length === 0 && (<h1> you have no lots yet</h1>)}
    </section>
  )
};

export default connect(
  (state: { lots: lotsReducerInterface }) => ({
    lots: state.lots.resources,
    isLoading: state.lots.isLoading,
  }),
  {
    fetchLots: (filters: {owner: 'all' | 'own'}): any => ({ type: lotsActions.fetchLots.request, payload: {filters} }),
  }
)(Lots);