import React, { ReactElement } from "react";

interface Props {
  total: number;
  current: number;
  perPage: number;
  onClickHandle: Function;
}

const Pagination: React.FunctionComponent<Props> = props => {
  const { total, current, perPage, onClickHandle } = props;

  const handleClick = () => {
    onClickHandle(1);
  };

  return (
    <div>
      <ul id="page-numbers">
        {[...Array(Math.ceil(total / perPage)).keys()].map(number => {
          return <h1>1</h1>;
        })}
      </ul>
    </div>
  );
};

export default Pagination;
