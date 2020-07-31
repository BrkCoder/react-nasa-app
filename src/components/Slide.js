/* eslint-disable jsx-a11y/media-has-caption */
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
      {slide.media_type === "video" ? (
        <iframe
          title="nasa youtube video"
          type="text/html"
          className={slideImageClassName}
          src={slide.url}
          frameBorder="0"
        ></iframe>
      ) : (
        <img
          className={slideImageClassName}
          src={slide.url}
          alt={slide.explanation}
        />
      )}
    </li>
  );
};

export default Slide;
