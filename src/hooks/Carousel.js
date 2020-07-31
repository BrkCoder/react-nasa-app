import { useEffect, useReducer } from "react";
import { Apod } from "../services/Apod";
import reducer, { initialState } from "../reducers/Carousel";
import { FETCH_SLIDES } from "../actions/Carousel";

export const useCarouselManagement = () => {
  const [state, dispatch] = useReducer(reducer, initialState);

  //Init Carousel Slides
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

  //Init AutoSwitch Carousel Slides
  useEffect(() => {
    return setAutoSwitchInterval(state);
  }, [state.autoSwitch, state.autoSwitchCallback, state.autoSwitchDelay]);

  //Helper methods
  const setAutoSwitchInterval = ({
    autoSwitch: auto,
    autoSwitchCallback: callback,
    autoSwitchDelay: delay,
  }) => {
    const intervalId = auto && callback ? setInterval(callback, delay) : null;
    return () => clearInterval(intervalId);
  };

  const fetchSlides = async function () {
    const apod = new Apod();
    const result = await apod.getAstronomyPicturesOfTheWeek();
    return result.filter((slide) => slide.media_type === "image");
  };

  return [state, dispatch];
};

export default useCarouselManagement;
