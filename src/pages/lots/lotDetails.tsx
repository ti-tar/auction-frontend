import React, {useEffect, ComponentType, PropsWithChildren} from 'react';
import { connect } from 'react-redux';
import moment from 'moment';
import { compose } from "redux";
import { RouteComponentProps, withRouter , StaticContext} from "react-router";

// actions
import * as lotsActions from '../../domain/lots/actions';
import * as bitsActions from '../../domain/bids/actions';

// interface
import lotInterface from '../../interfaces/lot';
import lotsReducerInterface from '../../interfaces/lotsReducer';
import userReducerInterface from "../../interfaces/userReducer";
import bidsReducerInterface from "../../interfaces/bidReducer";

import "./styles/lotDetailsStyles.scss";
import * as H from "history";

import {Link} from "react-router-dom";
import {fetchBids} from "../../domain/bids/sagas";

type PathParamsType = {
	id: string,
}

interface Props {
	lot: lotInterface,
	userId: number,
	bids: any,
	isLoading: boolean,
	bidsTotal: number,
	fetchLot: Function,
	fetchBids: Function,

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

	const { lot, fetchLot, fetchBids, match: { params: { id: lotId } }, isLoading , userId, bids, bidsTotal } = props;

	useEffect(() => {
		fetchLot(lotId);
		fetchBids(lotId);
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

			<div>
				<h2>Bids</h2>
			{ !!bids && !!bids.length && (
				bids.map((bid: any) =>
					<div style={{margin: '2em 0'}}>
						<div><u>{bid.user.firstName}</u> at {moment(bid.bidCreationTime).format('DD MMM YY, hh:mm:ss')}</div>
						<p>Proposed Price: ${bid.proposedPrice}</p>
					</div>
				)
			)}
				<div>Total bids: {bidsTotal}</div>
			</div>

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
		(state: {
			lots: lotsReducerInterface,
			user: userReducerInterface,
			bids: bidsReducerInterface,
		}) => ({
			lot: state.lots.resource,
			userId: state.user.id,
			bids: state.bids.resources,
			bidsTotal: state.bids.meta.total,
			isLoading: state.lots.isLoading,
		}),
		{
			fetchLot: (lotId: string): any => ({ type: lotsActions.fetchLot.request, payload: {lotId} }),
			fetchBids: (lotId: string): any => ({ type: bitsActions.fetchBids.request, payload: {lotId} }),
		}
	),
	withRouter
)(LotDetails);

export default lotDetailsRoute;