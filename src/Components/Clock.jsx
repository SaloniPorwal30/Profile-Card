import React, { useState, useEffect } from "react";
import "../Pages/Profile/Profile.css";

const Clock = ({ selectedPlaceTime }) => {
  const [currentTime, setCurrentTime] = useState(
    new Date(selectedPlaceTime?.datetime)
  );
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    let timerId;

    const updateClock = () => {
      setCurrentTime((prevTime) => new Date(prevTime.getTime() + 1000));
    };

    if (!isPaused) {
      timerId = setInterval(updateClock, 1000);
    }

    return () => {
      clearInterval(timerId);
    };
  }, [isPaused, selectedPlaceTime]);

  useEffect(() => {
    // Reset the timer when the selectedPlaceTime changes
    setCurrentTime(new Date(selectedPlaceTime?.datetime));
  }, [selectedPlaceTime]);

  const formatTime = (time) => {
    return time.toLocaleString("en-US", {
      timeZone: selectedPlaceTime.timezone,
      //   hour12: false,
    });
  };

  const handlePauseResume = () => {
    setIsPaused(!isPaused);
  };

  return (
    <>
      <div>
        <span> {formatTime(currentTime).split(" ").slice(1).join(" ")}</span>
        <button onClick={handlePauseResume}>
          {isPaused ? "Pause" : "Start"}
        </button>
      </div>
    </>
  );
};

export default Clock;
