import React, { useEffect } from "react";
import { Field, InjectedFormProps, reduxForm } from "redux-form";
import { OrderDeliveryType } from "../../interfaces/order";

interface Props {}

export interface OrderFormValues {
  arrivalLocation: string;
  type: string;
}

const orderForm: React.FC<Props & InjectedFormProps<OrderFormValues>> = ({
  handleSubmit
}) => {
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div>
          <Field name="type" component="select">
            {Object.keys(OrderDeliveryType).map((k: any) => (
              <option value={OrderDeliveryType[k]} key={k}>
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
    </div>
  );
};

export default reduxForm<OrderFormValues>({
  form: "form-order-create",
  enableReinitialize: true
})(orderForm);
