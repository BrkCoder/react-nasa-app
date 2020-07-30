import React from "react";

const Slide = ({
  index,
  currentIndex,
  slideClassName,
  slideActiveClassName,
  slideImageClassName,
  slide,
}) => {
  return (
    <li
      className={index === currentIndex ? slideActiveClassName : slideClassName}
      key={index}
    >
      <img
        className={slideImageClassName}
        src={slide.url}
        alt={slide.explanation}
      />
    </li>
  );
};

export default Slide;
