import React, {useEffect, ComponentType, PropsWithChildren} from 'react';
import { connect } from 'react-redux';
import moment from 'moment';
import { compose } from "redux";
import { RouteComponentProps, withRouter , StaticContext} from "react-router";

// actions
import  * as lotsActions from '../../domain/lots/actions';

// interface
import lotInterface from '../../interfaces/lot';
import lotsReducerInterface from '../../interfaces/lotsReducer';

import "./styles/lotDetailsStyles.scss";
import * as H from "history";

type PathParamsType = {
	id: string,
}

type PropsType = RouteComponentProps<PathParamsType> & {
	lot: lotInterface,
	isLoading: boolean,
	fetchLot: Function,

}

interface Props {
	lot: lotInterface,
	isLoading: boolean,
	fetchLot: Function,

	history: H.History,
	location: H.Location<H.LocationState>;
	match: {
		params: {
			id: string,
		}
	},
	staticContext?: any,
}

const LotDetails: React.FC<Props> = (props) => {

	const { lot, fetchLot, match: { params: { id: lotId } }, isLoading } = props;

	useEffect(() => {
		fetchLot(lotId);
	}, []);

	return (
		<section className="lotDetails">
			{!!lot && (
				<div className="lot" key={`${lot.id} ${lot.title}`}>
					<div className="lot__img">
						<div>
							{lot.image}
						</div>
					</div>
					<div className="lot__product">
						<h3>
							{lot.title}
						</h3>
						<p>
							{lot.description}
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
			)}
			{ isLoading && (
				<h1>Loading..</h1>
			)}
		</section>
	)
};

const lotDetailsRoute: any = compose(
	connect(
		(state: { lots: lotsReducerInterface }) => ({
			lot: state.lots.resource,
			isLoading: state.lots.isLoading,
		}),
		{
			fetchLot: (lotId: string): any => ({ type: lotsActions.fetchLot.request, payload: {lotId} }),
		}
	),
	withRouter
)(LotDetails);

export default lotDetailsRoute;