import React from "react";
import { Field, InjectedFormProps, reduxForm } from "redux-form";
import { OrderDeliveryType } from "../../interfaces/order";

export interface OrderFormValues {
  arrivalLocation: string;
  type: string;
}

const orderForm: React.FC<InjectedFormProps<OrderFormValues>> = ({
  handleSubmit
}) => {
  return (
    <form onSubmit={handleSubmit}>
      <div>
        <Field name="type" component="select">
          {Object.keys(OrderDeliveryType).map((k: any) => (
            <option value={k} key={k}>
              {OrderDeliveryType[k]}
            </option>
          ))}
        </Field>
      </div>
      <div>
        <Field
          name="arrivalLocation"
          type="text"
          component="input"
          placeholder="arrival location"
          autoComplete="off"
        />
      </div>
      <div className="submitBtn">
        <button type="submit">Submit</button>
      </div>
    </form>
  );
};

export default reduxForm<OrderFormValues>({
  form: "form-order-create"
})(orderForm);
