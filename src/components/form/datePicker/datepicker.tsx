import React, { useState } from "react";
import DatePicker from "react-datepicker";
import moment from "moment";

import "react-datepicker/dist/react-datepicker.css";

interface Props {
  name?: string;
  input: {
    onChange: Function;
    value: string;
  };
  meta: {
    touched: boolean;
    error: boolean;
  };
}

const CustomDatePicker: React.FC<Props> = (props) => {
  const { input, meta: { touched, error } } = props;

  const [startDate, setStartDate] = useState(new Date());

  return (
    <div>
      <DatePicker
        {...input}
        selected={startDate}
        onChange={(date: Date) => {
          input.onChange(moment(date).format('YYYY-MM-DD HH:mm:ss'));
          setStartDate(date)
        }}
        dateFormat="YYYY-MM-DD HH:mm:ss"
        autoComplete="off"
        showTimeInput
        timeInputLabel="Time:"
      />
      {touched && error && <span>{error}</span>}
    </div>
  );
}

export default CustomDatePicker;
