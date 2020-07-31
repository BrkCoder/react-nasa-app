import React from "react";
import Indicator from "../Indicator";

const getIndicators = ({ slides, currentIndex }, setCurrentSlideIndex) => {
  return (
    slides &&
    slides.map((slide, index) => (
      <Indicator
        key={index}
        index={index}
        currentIndex={currentIndex}
        indicatorClassName="carousel__indicator"
        indicatorActiveClassName="carousel__indicator carousel__indicator--active"
        clickHandler={() => setCurrentSlideIndex(index)}
      />
    ))
  );
};

export default getIndicators;
