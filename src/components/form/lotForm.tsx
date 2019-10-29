import React from "react";
import { Field, InjectedFormProps, reduxForm } from "redux-form";
import CustomDatePicker from "./datePicker/datepicker";
import LotInterface from "../../interfaces/lot";
import { FORMS } from "../../constants";

interface Props {}

export interface LotFormValues extends LotInterface {}

const LotForm: React.FC<Props & InjectedFormProps<LotFormValues>> = ({
  handleSubmit
}) => {
  return (
    <form onSubmit={handleSubmit}>
      <Field
        name="title"
        type="text"
        component="input"
        placeholder="title"
        autoComplete="off"
      />

      <Field
        name="currentPrice"
        type="text"
        component="input"
        placeholder="currentPrice"
        autoComplete="off"
        parse={(value: string): number => parseFloat(value)}
      />

      <Field
        name="estimatedPrice"
        type="text"
        component="input"
        placeholder="estimatedPrice"
        autoComplete="off"
        parse={(value: string): number => parseFloat(value)}
      />

      <Field name="endTime" type="text" component={CustomDatePicker} />

      <Field
        name="description"
        component="textarea"
        placeholder="description"
      />

      <Field name="image" type="hidden" component="input" placeholder="image" />

      <div className="submitBtn">
        <button type="submit">Submit</button>
      </div>
    </form>
  );
};

export default reduxForm<LotFormValues>({
  form: FORMS.FORM_LOT_EDIT,
  enableReinitialize: true
})(LotForm);
