import React, { Fragment } from "react";
import { LEFT, RIGHT } from "../../constants/Direction";
import {
  SET_CUREENT_SLIDE_INDEX,
  SET_NEXT_SLIDE_INDEX,
  SET_PREV_SLIDE_INDEX,
  SET_AUTO_SWITCH,
} from "../../actions/Carousel";
import Arrow from "../Arrow";
import getSlides from "./Slides";
import getIndicators from "./Indicators";
import useCarouselManagement from "../../hooks/Carousel";

import "./Carousel.scss";

const Carousel = () => {
  console.log("rernder carousel");
  const [state, dispatch] = useCarouselManagement();

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

  const setAutoSwitch = (
    autoSwitch,
    autoSwitchDelay,
    autoSwitchCallback
  ) => () => {
    dispatch({
      type: SET_AUTO_SWITCH,
      payload: {
        autoSwitch,
        autoSwitchDelay,
        autoSwitchCallback,
      },
    });
  };

  return (
    <div className="carousel">
      <Arrow
        direction={LEFT}
        arrowClassName="carousel__arrow carousel__arrow--left"
        iconClassName="carousel-arrow__icon"
        clickHandler={setPrevSlideIndex}
      />
      <ul className="carousel__slides">{getSlides(state)}</ul>
      <Arrow
        direction={RIGHT}
        arrowClassName="carousel__arrow carousel__arrow--right"
        iconClassName="carousel-arrow__icon"
        clickHandler={setNextSlideIndex}
      />
      <ul className="carousel__indicators">
        {getIndicators(state, setCurrentSlideIndex)}
      </ul>
      {!state.autoSwitch ? (
        <Fragment>
          <button onClick={setAutoSwitch(true, 1000, setNextSlideIndex)}>
            Play Forward
          </button>
          <button onClick={setAutoSwitch(true, 1000, setPrevSlideIndex)}>
            Play Backward
          </button>
        </Fragment>
      ) : (
        <button onClick={setAutoSwitch(false, null, null)}>Stop</button>
      )}
    </div>
  );
};

export default Carousel;
