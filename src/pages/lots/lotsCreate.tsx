import React from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { Field, reduxForm, InjectedFormProps } from 'redux-form';

// actions
import  * as lotsActions from '../../domain/lots/actions';
import lotsReducerInterface from "../../interfaces/lotsReducer";

// components
import Datepicker from '../../components/form/datePicker/datepicker';

// css
import "./styles/lotsCreateStyles.scss";


interface DummyFormComponentProps {
	InjectedFormProps
}

const LotsCreateFrom = reduxForm({
	form: 'form-lots-create',
})((props) => {
	const { handleSubmit } = props;

	const handleBeforeSubmit = (v: any) => {
		console.log(v);
	};
	return (
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
				component={Datepicker}
			/>

			<Field
				name="endTime"
				component={Datepicker}
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
	);
});


interface Props {
	isLoading: boolean,
}

const	LotsCreate: React.FunctionComponent<Props & DummyFormComponentProps> = (props) => {

	return (
		<section className="lotsCreate">

			<div className="title">
				Create Lot
			</div>

			<div className="fromWrapper">
				<LotsCreateFrom />
			</div>

		</section>
	);
};

export default compose(
	connect(
		(state: { lots: lotsReducerInterface }) => ({
			isLoading: state.lots.isLoading,
		}),
		{
			fetchLotsCreate: (): any => ({ type: lotsActions.fetchLotsCreate.request }),
		}
	),
)(LotsCreate);