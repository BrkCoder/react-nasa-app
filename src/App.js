import React from 'react';
import ReactDOM from 'react-dom';
import Carousel from './components/Carousel';
import {CarouselStore} from './context/CarouselStore';

import './App.scss';

const App = () => {
  return (
    <CarouselStore>
      <Carousel/>
    </CarouselStore>
  );
};

ReactDOM.render(<App/>, document.getElementById('root'));
