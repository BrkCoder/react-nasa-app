import React from "react";
import useProgress from "../hooks/useProgress";

const ProgressBar = ({ animate, time }) => {
  const progress = useProgress(animate, time);
  return (
    <div className="ProgressBar">
      <div style={{ width: `${progress * 100}%` }}></div>
    </div>
  );
};

export default ProgressBar;
