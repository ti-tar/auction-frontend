import React, { useEffect } from 'react';
import { connect } from 'react-redux';

// actions
import  * as lotsActions from '../../domain/lots/actions';

// interface
import lotInterface from '../../interfaces/lot';
import lotsReducerInterface from '../../interfaces/lotsReducer';

import "./lotsStyles.css";


interface Props {
  lots: lotInterface[],
  isLoading: boolean,
}

const Lots = (props: Props & { fetchLots: Function, children?: React.ReactNode }) => {
  useEffect(() => {
    props.fetchLots();
  }, []);

  return (
    <section className={'lots'}>
      {props.lots.map((lot:lotInterface) => (
        <div className="lot">
          {lot.title}
        </div>
      ))}
    </section>
  )
};

export default connect(
  (state: { lots: lotsReducerInterface }) => ({
    lots: state.lots.resources,
    isLoading: state.lots.isLoading,
  }), 
  {
    fetchLots: (): any => ({ type: lotsActions.fetchLots.request }),
  }
)(Lots);