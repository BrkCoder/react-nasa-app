import { useEffect, useReducer } from "react";
import reducer, { initialState } from "../reducers/Carousel";
import { FETCH_SLIDES } from "../actions/Carousel";
import { subDays, format } from "date-fns";
import { Nasa } from "../services/Nasa";

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
    const nasa = new Nasa();
    const dates = getDates(7);
    const slides = await Promise.all(
      dates.map((date) => nasa.Apod(date, true))
    );
    console.log(slides);
    return slides;
  };

  const getDates = (daysAgo) => {
    return Array(daysAgo)
      .fill(null)
      .map((_, i) => subDays(new Date(), i))
      .map((date) => format(date, "yyyy-MM-dd"));
  };

  return [state, dispatch];
};

export default useCarouselManagement;
