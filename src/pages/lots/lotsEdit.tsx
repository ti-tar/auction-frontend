import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { Field, reduxForm } from 'redux-form';
import { toast } from 'react-toastify';
import { withRouter } from 'react-router-dom';
// actions
import  * as lotsActions from '../../domain/lots/actions';

// components
import CustomDatePicker from '../../components/form/datePicker/datepicker';

// interfaces
import LotCreateInterface from '../../interfaces/lotCreate';

// css
import "./styles/lotsCreateStyles.scss";
import * as bitsActions from "../../domain/bids/actions";


type Props = React.ReactChild & {
	handleSubmit: Function,
	createNewLot: Function,
	updateLot: Function,
	history: Function,
	match: any, // todo
	fetchLot: Function,
	lot: any, // todo
};

const LotsEdit: React.FC<Props> = (props) => {

	const {handleSubmit, createNewLot, updateLot, history, match: { params: { lotId }}, fetchLot} = props;

	useEffect(() => {
		if(lotId) {
			fetchLot(lotId);
		}
	}, []);

	const handleBeforeSubmit = (formValues: any): any => {

		if (!formValues.title || !formValues.currentPrice || !formValues.estimatedPrice || !formValues.startTime || !formValues.endTime) {
			toast.error('fill all fields');
			return false;
		}

		const lotToSend: LotCreateInterface = {
			title: formValues.title,
			currentPrice: parseFloat(formValues.currentPrice),
			estimatedPrice: parseFloat(formValues.estimatedPrice),
			startTime: formValues.startTime,
			endTime: formValues.endTime,
		};

		if (formValues.description) {
			lotToSend.description = formValues.description;
		}
		if (formValues.image) {
			lotToSend.image = formValues.image;
		}

		if (lotId) {
			updateLot(lotToSend, lotId, history);
		} else {
			createNewLot(lotToSend, history);
		}
	};

	return (
		<section className="lotsCreate">

			<div className="title">
				{ !!lotId ? 'Edit Lot' : 'Create Lot'}
			</div>

			<div className="fromWrapper">


				<form onSubmit={handleSubmit(handleBeforeSubmit)}>
					<Field
						name="title"
						type="text"
						component="input"
						placeholder="title"
					/>

					<Field
						name="currentPrice"
						type="text"
						component="input"
						placeholder="currentPrice"
					/>

					<Field
						name="estimatedPrice"
						type="text"
						component="input"
						placeholder="estimatedPrice"
					/>

					<Field
						name="startTime"
						component={CustomDatePicker}
					/>

					<Field
						name="endTime"
						component={CustomDatePicker}
					/>

					<Field
						name="description"
						component="textarea"
						placeholder="description"
					/>

					<Field
						name="image"
						type="text"
						component="input"
						placeholder="image"
					/>

					<div className="submitBtn">
						<button type="submit">
						Submit
						</button>
					</div>

				</form>

			</div>

		</section>
	);
};

const LotsEditRouteComponent: any = compose(
	withRouter,
	connect(
		(state:any, ownProps: any) => {
			const { lotId } = ownProps.match.params;
			return {
				lot: state.lots.resource,
				initialValues: lotId ? state.lots.resource : {},
			}
		},
		{
			createNewLot: (newLot: LotCreateInterface, history: Function): any => ({ type: lotsActions.createNewLot.request, payload: newLot, history }),
			updateLot: (updatedLot: LotCreateInterface, lotId: string, history: Function): any => ({ type: lotsActions.updateLot.request, payload: {lotId, updatedLot}, history }),
			fetchLot: (lotId: string): any => ({ type: lotsActions.fetchLot.request, payload: {lotId} }),
		}
	),
	reduxForm({
		form: 'form-lots-edit',
		enableReinitialize : true
	}),
) (LotsEdit);

export default LotsEditRouteComponent;