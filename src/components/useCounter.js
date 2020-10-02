import React, { useState, useEffect } from 'react';

function useCounter(startCounting) {
  const [minutes, setMinutes] = useState(0);
  const [seconds, setSeconds] = useState(0);
  const [intervalId, setIntervalId] = useState();

  const Counter = () => {
    useEffect(() => {
      if (startCounting !== null) {
        setIntervalId(
          setInterval(() => {
            setSeconds((seconds) => {
              if (seconds + 1 >= 60) {
                setMinutes((minutes) => minutes + 1);
                return 0;
              } else {
                return seconds + 1;
              }
            });
          }, 1000)
        );
      } else {
        clearInterval(intervalId);
      }

      return clearInterval(intervalId);
    }, [startCounting]);

    return (
      <div className="counter">
        {minutes < 10 ? `0${minutes}` : minutes}:
        {seconds < 10 ? `0${seconds}` : seconds}
      </div>
    );
  };

  return [Counter, setMinutes, setSeconds];
}

export default useCounter;
