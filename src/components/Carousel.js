import React, {useEffect} from 'react';
import {CarouselContext} from '../context/CarouselContext';

import './Carousel.scss';

const Carousel = () => {
  const {
    slides,
    currentIndex,
    fetchSlides,
    setCurrentIndex,
    setNextIndex,
    setPrevIndex,
    startAutoSwitch,
    stopAutoSwitch
  } = React.useContext(CarouselContext);

  useEffect(() => {
    const fetchData = async () => await fetchSlides();
    fetchData();
  }, []);

  return (
    <div className="carousel">

      <ul className="slides">
        {slides && slides.map((slide, index) => (
          <li key={index} className={currentIndex === index ? 'active' : ''}>
            <img src={slide.hdurl} alt={slide.explanation}/>
          </li>
        ))}
      </ul>

      <ul className="bullets">
        <li><button onClick={() => setPrevIndex()}>prev</button></li>
        {slides && slides.map((slide, index) => (
          <li key={index} className={currentIndex === index ? 'bullet active' : 'bullet'}>
            <button onClick={() => setCurrentIndex(index)}>{index}</button>
          </li>
        ))}
        <li><button onClick={() => setNextIndex()}>next</button></li>
      </ul>

      <div className="controls">
        <button onClick={() => stopAutoSwitch()}>stop</button>
        <button onClick={() => startAutoSwitch('back')}>start backward</button>
        <button onClick={() => startAutoSwitch('forward')}>start forward</button>
      </div>

    </div>
  );
};

export default Carousel;
