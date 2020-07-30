import React from "react";

const Indicator = ({
  index,
  currentIndex,
  indicatorClassName,
  indicatorActiveClassName,
  clickHandler,
}) => {
  return (
    <li key={index}>
      <span
        role="button"
        tabIndex="0"
        className={
          index === currentIndex ? indicatorActiveClassName : indicatorClassName
        }
        onClick={clickHandler}
        onKeyDown={clickHandler}
      ></span>
    </li>
  );
};

export default Indicator;
