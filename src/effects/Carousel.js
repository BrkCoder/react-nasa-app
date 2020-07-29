import { Apod } from "../services/Apod";

export const fetchSlidesEffect = async function () {
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
  return result;
};

export const setAutoSlidesIntervalEffect = ({
  autoSlides: auto,
  autoSlidesIntervalCallback: callback,
  autoSlidesIntervalDelay: delay,
}) => {
  let intervalId = null;
  if (auto && callback && delay) {
    intervalId = setInterval(() => callback(), delay);
  } else if (intervalId) {
    clearInterval(intervalId);
  }

  return () => clearInterval(intervalId);
};
