import React from 'react';
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


type Props = React.ReactChild & { handleSubmit: Function, createNewLot: Function, history: Function};

const LotsEdit: React.FC<Props> = (props) => {

	const {handleSubmit, createNewLot, history} = props;

	const handleBeforeSubmit = (formValues: any) => {
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

		createNewLot(lotToSend, history);

	};

	return (
		<section className="lotsCreate">

			<div className="title">
				Create Lot
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
	connect(
		null,
		{
			createNewLot: (newLot: LotCreateInterface, history: Function): any => ({ type: lotsActions.createNewLot.request, payload: newLot, history }),
		}
	),
	reduxForm({
		form: 'form-lots-create',
	}),
	withRouter
) (LotsEdit);

export default LotsEditRouteComponent;