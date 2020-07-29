import React, { useReducer, useEffect, Fragment } from "react";
import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from "react-icons/md";
import {
  SET_CUREENT_SLIDE_INDEX,
  SET_NEXT_SLIDE_INDEX,
  SET_PREV_SLIDE_INDEX,
  TOGGLE_AUTO_SLIDES,
  SET_SLIDES,
} from "../actions/Carousel";
import reducer, { initialState } from "../reducers/Carousel";
import {
  setAutoSlidesIntervalEffect,
  fetchSlidesEffect,
} from "../effects/Carousel";

import "./Carousel.scss";

const Carousel = () => {
  // State Management
  const [state, dispatch] = useReducer(reducer, initialState);

  //Effects
  useEffect(() => setAutoSlidesIntervalEffect(state), [
    state.autoSlides,
    state.autoSlidesIntervalCallback,
    state.autoSlidesIntervalDelay,
  ]);

  useEffect(() => {
    fetchSlidesEffect().then((slides) => {
      const filteredSlides = slides.filter(
        (slide) => slide.media_type === "image"
      );
      dispatch({
        type: SET_SLIDES,
        payload: {
          slides: filteredSlides,
        },
      });
    });
  }, []);

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

  return (
    <div className="carousel">
      <span
        role="button"
        tabIndex="0"
        className="carousel__arrow carousel__arrow--left"
        onClick={decrementCurrentSlideIndex}
        onKeyDown={decrementCurrentSlideIndex}
      >
        <MdKeyboardArrowLeft className="carousel-arrow__icon" />
      </span>

      <ul className="carousel__slides">
        {state.slides.map((slide, index) => (
          <li
            className={
              index === state.index
                ? "carousel__slide carousel__slide--active"
                : "carousel__slide"
            }
            key={index}
          >
            <img
              className="carousel-slide__image"
              src={slide.url}
              alt={slide.explanation}
            />
          </li>
        ))}
      </ul>

      <span
        role="button"
        tabIndex="0"
        className="carousel__arrow carousel__arrow--right"
        onClick={incrementCurrentSlideIndex}
        onKeyDown={incrementCurrentSlideIndex}
      >
        <MdKeyboardArrowRight className="carousel-arrow__icon" />
      </span>

      <ul className="carousel__indicators">
        {state.slides.map((slide, index) => (
          <li key={index}>
            <span
              role="button"
              tabIndex="0"
              className={
                index === state.index
                  ? "carousel__indicator carousel__indicator--active"
                  : "carousel__indicator"
              }
              onClick={setCurrentSlideIndex(index)}
              onKeyDown={setCurrentSlideIndex(index)}
            ></span>
          </li>
        ))}
      </ul>
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
