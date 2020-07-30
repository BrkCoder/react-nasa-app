import { Apod } from "../services/Apod";

export const setAutoSlidesEffect = (state) => () => {
  return setAutoSlidesInterval(state);
};

const setAutoSlidesInterval = ({
  autoSlides: auto,
  autoSlidesIntervalCallback: callback,
  autoSlidesIntervalDelay: delay,
}) => {
  const intervalId = auto && callback ? setInterval(callback, delay) : null;
  return () => clearInterval(intervalId);
};

export const setInitialSlidesEffect = (callback) => () => {
  fetchSlides()
    .then((slides) => callback(slides))
    .catch(console.error);
};

const fetchSlides = async function () {
  const apod = new Apod();
  const now = new Date();
  const last = new Date(now.getFullYear(), now.getMonth(), now.getDate() - 1);
  const initial = new Date(
    last.getFullYear(),
    last.getMonth(),
    last.getDate() - 7
  );
  const result = [];
  for (let d = initial; d <= last; d.setDate(d.getDate() + 1)) {
    const slide = await apod.getPictureOfTheDay(d, true);
    result.push(slide);
  }
  return result.filter((slide) => slide.media_type === "image");
};
