import React from "react";
import ReactDOM from "react-dom";
import Carousel from "./Carousel";

import "./App.scss";

const App = () => {
  return (
    <div className="container">
      <Carousel />
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById("root"));
