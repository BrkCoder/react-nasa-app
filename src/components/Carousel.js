import React, { useReducer, Fragment } from "react";
import {
  SET_CUREENT_SLIDE_INDEX,
  SET_NEXT_SLIDE_INDEX,
  SET_PREV_SLIDE_INDEX,
  TOGGLE_AUTO_SLIDES,
  SET_SLIDES,
} from "../actions/Carousel";
import reducer, { initialState } from "../reducers/Carousel";
import { LEFT, RIGHT } from "../constants/Directions";
import Arrow from "./Arrow";

import "./Carousel.scss";
import Slide from "./Slide";
import Indicator from "./Indicator";
import { useAutoSlides, useInitialSlides } from "../hooks/Carousel";

const Carousel = () => {
  // State Management
  const [state, dispatch] = useReducer(reducer, initialState);

  //Effects
  useInitialSlides((slides) => {
    dispatch({
      type: SET_SLIDES,
      payload: {
        slides,
      },
    });
  });
  useAutoSlides(state);

  //Methods
  const setCurrentSlideIndex = (index) => () => {
    dispatch({
      type: SET_CUREENT_SLIDE_INDEX,
      payload: {
        index,
      },
    });
  };

  const incrementCurrentSlideIndex = (event) => {
    if (event) {
      event.preventDefault();
    }
    dispatch({
      type: SET_NEXT_SLIDE_INDEX,
      payload: {
        length: state.slides.length,
      },
    });
  };

  const decrementCurrentSlideIndex = (event) => {
    if (event) {
      event.preventDefault();
    }
    dispatch({
      type: SET_PREV_SLIDE_INDEX,
      payload: {
        length: state.slides.length,
      },
    });
  };

  const toggleAutoSlides = (callback) => () => {
    dispatch({
      type: TOGGLE_AUTO_SLIDES,
      payload: {
        callback,
        delay: 5000,
      },
    });
  };

  const getSlides = () => {
    return state.slides.map((slide, index) => {
      return (
        <Slide
          key={index}
          index={index}
          currentIndex={state.index}
          slide={slide}
          slideClassName="carousel__slide"
          slideActiveClassName="carousel__slide carousel__slide--active"
          slideImageClassName="carousel-slide__image"
        />
      );
    });
  };

  const getIndicators = () => {
    return state.slides.map((slide, index) => (
      <Indicator
        key={index}
        index={index}
        currentIndex={state.index}
        indicatorClassName="carousel__indicator"
        indicatorActiveClassName="carousel__indicator carousel__indicator--active"
        clickHandler={setCurrentSlideIndex(index)}
      />
    ));
  };

  return (
    <div className="carousel">
      <Arrow
        direction={LEFT}
        arrowClassName="carousel__arrow carousel__arrow--left"
        iconClassName="carousel-arrow__icon"
        clickHandler={decrementCurrentSlideIndex}
      />

      <ul className="carousel__slides">{getSlides()}</ul>

      <Arrow
        direction={RIGHT}
        arrowClassName="carousel__arrow carousel__arrow--right"
        iconClassName="carousel-arrow__icon"
        clickHandler={incrementCurrentSlideIndex}
      />

      <ul className="carousel__indicators">{getIndicators()}</ul>
      {!state.autoSlides ? (
        <Fragment>
          <button onClick={toggleAutoSlides(incrementCurrentSlideIndex)}>
            Play Forward
          </button>
          <button onClick={toggleAutoSlides(decrementCurrentSlideIndex)}>
            Play Backward
          </button>
        </Fragment>
      ) : (
        <button onClick={toggleAutoSlides(null)}>Stop</button>
      )}
    </div>
  );
};

export default Carousel;
