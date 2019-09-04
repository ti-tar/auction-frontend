import React from "react";
import {compose} from "redux";
import {connect} from "react-redux";
import {Field, reduxForm} from "redux-form";
import {withRouter} from "react-router";
import {toast} from "react-toastify";
// bid actions
import * as bidActions from '../../domain/bids/actions';
// css
import './bidCreateStyles.scss';

const BidCreate: React.FunctionComponent = (props: any) => {

	const {handleSubmit, createBid, history } = props;

	const handleBeforeSubmit = (formValues: any) => {
		if (!formValues.proposedPrice ) {
			toast.error('fill the price field');
			return false;
		}

		const newBid: any = {
			proposedPrice: parseFloat(formValues.proposedPrice),
		};

		const lotId = 1;
		createBid(newBid, lotId, history);
	};

	return (
		<section className="bidCreate">

			<div className="title">
				Create bid
			</div>

			<div className="fromWrapper">

				<form onSubmit={handleSubmit(handleBeforeSubmit)}>
					<Field
						name="proposedPrice"
						type="text"
						component="input"
						placeholder="proposed price"
					/>

					<div className="submitBtn">
						<button type="submit">
							Submit
						</button>
					</div>

				</form>

			</div>

		</section>
	)
};


const BidCreateRouteComponent: any = compose(
	connect(
		null,
		{
			createBid: (newBid: any, lotId: any, history: any) => ({ type: bidActions.createBid.request, payload: { newBid, lotId }, history }),
		}
	),
	reduxForm({
		form: 'form-bid-create',
	}),
	withRouter
) (BidCreate);

export default BidCreateRouteComponent;