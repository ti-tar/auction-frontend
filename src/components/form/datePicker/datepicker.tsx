// https://github.com/Hacker0x01/react-datepicker/issues/543

import React from "react";
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

class CustomDatePicker extends React.Component<Props> {
  handleChange = (date: Date) => {
    this.props.input.onChange(moment(date).toISOString());
  };

  render() {
    const {
      input,
      meta: { touched, error }
    } = this.props;

    return (
      <div>
        <DatePicker {...input} showTimeSelect onChange={this.handleChange} />
        {touched && error && <span>{error}</span>}
      </div>
    );
  }
}

export default CustomDatePicker;
