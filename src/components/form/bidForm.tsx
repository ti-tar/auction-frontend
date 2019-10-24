import React from "react";
import { Field, InjectedFormProps, reduxForm } from "redux-form";

export interface BidFormData {
  proposedPrice: string;
}

const BidForm: React.FC<InjectedFormProps<BidFormData>> = ({
  handleSubmit
}) => {
  return (
    <form onSubmit={handleSubmit}>
      <Field
        name="proposedPrice"
        type="text"
        component="input"
        placeholder="proposed price"
      />
      <div className="submitBtn">
        <button type="submit">Submit</button>
      </div>
    </form>
  );
};

export default reduxForm<BidFormData>({ form: "add-bid-form" })(BidForm);
