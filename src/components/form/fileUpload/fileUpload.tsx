import React, { Component } from "react";

type Props = {
  input: any;
  label: any;
  required: any;
  meta: any;
};

export default class FieldFileInput<Props> extends Component {
  onChange = (e: any) => {
    const {
      input: { onChange }
    }: any = this.props;
    onChange(e.target.files[0]);
  };

  render() {
    const {
      input: { value },
      input,
      label,
      required,
      meta
    }: any = this.props;
    return (
      <div>
        <label>{label}</label>
        <div>
          <input
            type="file"
            accept=".jpg, .png, .jpeg"
            data-enctype="multipart/form-data"
            onChange={this.onChange}
          />
        </div>
      </div>
    );
  }
}
