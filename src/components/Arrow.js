import React from "react";
import {
  MdKeyboardArrowLeft,
  MdKeyboardArrowRight,
  MdKeyboardArrowUp,
} from "react-icons/md";
import { LEFT, RIGHT } from "../constants/Directions";

const Arrow = ({ direction, arrowClassName, iconClassName, clickHandler }) => {
  let icon = <MdKeyboardArrowUp className={iconClassName} />;
  if (direction == LEFT) {
    icon = <MdKeyboardArrowLeft className={iconClassName} />;
  } else if (direction === RIGHT) {
    icon = <MdKeyboardArrowRight className={iconClassName} />;
  }
  return (
    <span
      role="button"
      tabIndex="0"
      className={arrowClassName}
      onClick={clickHandler}
      onKeyDown={clickHandler}
    >
      {icon}
    </span>
  );
};

export default Arrow;
