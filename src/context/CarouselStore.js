import React from 'react';
import {CarouselContext} from './CarouselContext';
import {CarouselReducer} from './CarouselReducer';

import format from 'date-fns/format'
import subDays from 'date-fns/subDays'

const api = 'https://api.nasa.gov/planetary/apod';  // process.env.REACT_APP_API;
const apiKey = '[API KEY]]';                        // process.env.REACT_APP_KEY;

export const CarouselStore = ({children}) => {
  const [state, dispatch] = React.useReducer(CarouselReducer, {
    loading: false,
    currentIndex: 0,
    slides: [],
    autoSwitch: null, // 'back' | 'forward' | null
    autoSwitchDelay: 1000, // ms
  });

  const [time, setTime] = React.useState(0);

  React.useEffect(() => {
    if (state.autoSwitch) {
      if (state.autoSwitch === 'back') {
        setPrevIndex();
      }
      if (state.autoSwitch === 'forward') {
        setNextIndex();
      }
      const timeout = state.autoSwitchDelay || 1000;
      const timer = setTimeout(() => setTime(time + 1), timeout);
      return () => clearTimeout(timer);
    }
  }, [time, state.autoSwitch]);

  const getDates = (daysAgo) => {
    return Array(daysAgo)
      .fill(null)
      .map((_, i) => subDays(new Date(), i))
      .map(date => format(date, 'yyyy-MM-dd'))
  }

  const fetchSlide = async (date) => {
    const shortDateString = format(new Date(date), 'yyyy-MM-dd');
    const url = `${api}/?date=${shortDateString}&hd=true&api_key=${apiKey}`;
    const response = await fetch(url);
    return await response.json();
  }

  const fetchSlides = async () => {
    dispatch({type: 'SHOW_LOADER'});
    const slides = [];
    const dates = getDates(7);

    await Promise.all(dates.map(async (date) => {
      const slideInfo = await fetchSlide(date);
      if (slideInfo.media_type === 'image') {
        slides.push(slideInfo);
      }
    }));

    dispatch({type: 'FETCH_SLIDES', payload: slides});
    return slides;
  }

  const setCurrentIndex = (index) => {
    dispatch({type: 'SET_CURRENT_INDEX', payload: index});
  }

  const setNextIndex = () => {
    const length = state.slides.length;
    const current = state.currentIndex;
    setCurrentIndex(current === length - 1 ? 0 : current + 1);
  }

  const setPrevIndex = () => {
    const length = state.slides.length;
    const current = state.currentIndex;
    setCurrentIndex(current === 0 ? length - 1 : current - 1);
  }

  const startAutoSwitch = (direction) => {
    dispatch({type: 'SET_AUTO_SWITCH', payload: direction});
  }

  const stopAutoSwitch = () => {
    dispatch({type: 'SET_AUTO_SWITCH', payload: null});
  }

  return (
    <CarouselContext.Provider value={{
      /* properties */ ...state,
      /* methods*/ fetchSlides, setCurrentIndex, setNextIndex, setPrevIndex, startAutoSwitch, stopAutoSwitch
    }}>
      {children}
    </CarouselContext.Provider>
  )
};
