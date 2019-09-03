import React from "react";
import {compose} from "redux";
import {connect} from "react-redux";
import {Field, reduxForm} from "redux-form";
import {withRouter} from "react-router";
import {toast} from "react-toastify";
// css
import './bidCreateStyles.scss';

const BidCreate: React.FunctionComponent = (props: any) => {

	const {handleSubmit, createBid, history} = props;

	const handleBeforeSubmit = (formValues: any) => {
		if (!formValues.proposed_price ) {
			toast.error('fill the price field');
			return false;
		}

		const newBid: any = {
			proposed_price: formValues.proposed_price,
		};

		createBid(newBid, history);
	};


	return (
		<section className="bidCreate">

			<div className="title">
				Create bid
			</div>

			<div className="fromWrapper">

				<form onSubmit={handleSubmit(handleBeforeSubmit)}>
					<Field
						name="proposed_price"
						type="text"
						component="input"
						placeholder="proposed_price"
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
		null
	),
	reduxForm({
		form: 'form-bid-create',
	}),
	withRouter
) (BidCreate);

export default BidCreateRouteComponent;