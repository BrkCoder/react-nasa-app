import { useEffect } from "react";
import { addDays } from "date-fns";
import startOfWeek from "date-fns/startOfWeek";
import startOfToday from "date-fns/startOfToday";
import { Apod } from "../services/Apod";

export const useAutoSlides = (state) => {
  useEffect(() => {
    return setAutoSlidesInterval(state);
  }, [state.autoSlides, state.autoSlidesCallback, state.autoSlidesDelay]);
};

export const useInitialSlides = (callback) => {
  useEffect(() => {
    fetchSlides()
      .then((slides) => callback(slides))
      .catch(console.error);
  }, []);
};

const setAutoSlidesInterval = ({
  autoSlides: auto,
  autoSlidesCallback: callback,
  autoSlidesDelay: delay,
}) => {
  const intervalId = auto && callback ? setInterval(callback, delay) : null;
  return () => clearInterval(intervalId);
};

const fetchSlides = async function () {
  const result = await getAstronomyPicturesOfTheWeek();
  return result.filter((slide) => slide.media_type === "image");
};

const getAstronomyPicturesOfTheWeek = async function () {
  const apod = new Apod();
  const current = startOfToday();
  const past = startOfWeek(current);
  const slides = [];
  for (let date = past; date <= current; date = addDays(date, 1)) {
    try {
      const slide = await apod.getPictureOfTheDay(date, true);
      slides.push(slide);
    } catch (e) {
      console.error(e);
    }
  }
  return slides;
};
