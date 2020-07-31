import React from "react";
import Slide from "../Slide";

const getSlides = ({ slides, currentIndex }) => {
  return (
    slides &&
    slides.map((slide, index) => {
      return (
        <Slide
          key={index}
          index={index}
          currentIndex={currentIndex}
          slide={slide}
          slideClassName="carousel__slide"
          slideActiveClassName="carousel__slide carousel__slide--active"
          slideImageClassName="carousel-slide__image"
        />
      );
    })
  );
};

export default getSlides;
