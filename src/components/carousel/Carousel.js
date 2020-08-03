import React, { useEffect, useReducer, Fragment } from "react";
import reducer, { initialState } from "../../reducers/Carousel";
import {
  SET_CUREENT_SLIDE_INDEX,
  SET_NEXT_SLIDE_INDEX,
  SET_PREV_SLIDE_INDEX,
  SET_AUTO_PLAY,
  FETCH_SLIDES,
} from "../../actions/Carousel";
import getSlides from "./Slides";
import getIndicators from "./Indicators";
import { subDays, format } from "date-fns";
import { Nasa } from "../../services/Nasa";

import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from "react-icons/md";
import "./Carousel.scss";

/**
 * fetch Slides from Nasa api service.
 */
const fetchSlides = async function () {
  const nasa = new Nasa();
  const dates = getDates(7);
  const slides = await Promise.all(dates.map((date) => nasa.Apod(date, true)));
  const result = slides.filter(({ code }) => code !== 404);
  console.log(slides);
  return result;
};

/**
 * Return array of past dates from now.
 * @param {*} daysAgo
 */
const getDates = (daysAgo) => {
  return Array(daysAgo)
    .fill(null)
    .map((_, i) => subDays(new Date(), i))
    .map((date) => format(date, "yyyy-MM-dd"));
};

const Carousel = () => {
  const SLIDE_DURATION = 3000;
  const [state, dispatch] = useReducer(reducer, initialState);

  //Init Slides of Carousel
  useEffect(() => {
    fetchSlides()
      .then((slides) => {
        dispatch({
          type: FETCH_SLIDES,
          payload: {
            slides,
          },
        });
      })
      .catch(console.error);
  }, []);

  //Init AutoPlay of Carousel Slides
  useEffect(() => {
    if (state.autoPlay) {
      const timeout = setTimeout(() => {
        dispatch({
          type: SET_NEXT_SLIDE_INDEX,
        });
      }, SLIDE_DURATION);
      return () => clearTimeout(timeout);   
    }
  }, [state.autoPlay, state.currentIndex]);

  const setCurrentSlideIndex = (index) => {
    dispatch({
      type: SET_CUREENT_SLIDE_INDEX,
      payload: {
        index,
      },
    });
  };

  const setNextSlideIndex = () => {
    dispatch({
      type: SET_NEXT_SLIDE_INDEX,
    });
  };

  const setPrevSlideIndex = () => {
    dispatch({
      type: SET_PREV_SLIDE_INDEX,
    });
  };

  const setAutoPlay = (autoPlay) => () => {
    dispatch({
      type: SET_AUTO_PLAY,
      payload: {
        autoPlay,
      },
    });
  };

  return (
    <div className="carousel">
      <span
        role="button"
        tabIndex="0"
        className="carousel__arrow carousel__arrow--left"
        onClick={setNextSlideIndex}
        onKeyDown={setNextSlideIndex}
      >
        <MdKeyboardArrowLeft className="carousel-arrow__icon" />
      </span>
      <ul className="carousel__slides">{getSlides(state)}</ul>
      <span
        role="button"
        tabIndex="0"
        className="carousel__arrow carousel__arrow--right"
        onClick={setPrevSlideIndex}
        onKeyDown={setPrevSlideIndex}
      >
        <MdKeyboardArrowRight className="carousel-arrow__icon" />
      </span>
      <ul className="carousel__indicators">
        {getIndicators(state, setCurrentSlideIndex)}
      </ul>
      {!state.autoPlay ? (
        <Fragment>
          <button onClick={setAutoPlay(true)}>Play</button>
        </Fragment>
      ) : (
        <button onClick={setAutoPlay(false)}>Stop</button>
      )}
    </div>
  );
};

export default Carousel;
