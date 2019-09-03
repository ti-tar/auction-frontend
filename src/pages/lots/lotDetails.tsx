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
import userReducerInterface from "../../interfaces/userReducer";
import {Link} from "react-router-dom";

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
	userId: number,
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

	const { lot, fetchLot, match: { params: { id: lotId } }, isLoading , userId } = props;

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
						<p>
							<u>Status:</u> {lot.status}
						</p>

						{!!lot.user && (
						<p>
							<u>Owner:</u><br />
							{lot.user.firstName}<br />
							{lot.user.email}<br />
						</p>
						)}
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

			{
				!isLoading && lot.user && userId === lot.user.id
					? (
            <div className="make_bid_wrapper">
                You are not allowed to bid your own lot.
            </div>
					)
					: !isLoading && lot && lot.id && (
						<div className="make_bid_wrapper">
							<Link
								className="make_bid_button"
								to={{ pathname: `/lots/${lot.id}/make_bid` }}
							>
								Make a bid
							</Link>
						</div>
					)
			}
		</section>
	)
};

const lotDetailsRoute: any = compose(
	connect(
		(state: { lots: lotsReducerInterface, user: userReducerInterface }) => ({
			lot: state.lots.resource,
			userId: state.user.id,
			isLoading: state.lots.isLoading,
		}),
		{
			fetchLot: (lotId: string): any => ({ type: lotsActions.fetchLot.request, payload: {lotId} }),
		}
	),
	withRouter
)(LotDetails);

export default lotDetailsRoute;