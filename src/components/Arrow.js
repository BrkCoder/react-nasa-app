import React from "react";
import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from "react-icons/md";
import { RIGHT } from "../constants/Direction";

const Arrow = ({ direction, arrowClassName, iconClassName, clickHandler }) => {
  return (
    <span
      role="button"
      tabIndex="0"
      className={arrowClassName}
      onClick={clickHandler}
      onKeyDown={clickHandler}
    >
      {direction === RIGHT ? (
        <MdKeyboardArrowRight className={iconClassName} />
      ) : (
        <MdKeyboardArrowLeft className={iconClassName} />
      )}
    </span>
  );
};

export default Arrow;
