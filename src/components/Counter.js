import React, { useState, useEffect } from 'react';
import { useStateContext } from './Context';

function Counter({ startCounting, setStartCounting, clearCounter }) {
  const [minutes, setMinutes] = useState(0);
  const [seconds, setSeconds] = useState(0);
  const [intervalId, setIntervalId] = useState();

  const theme = useStateContext().theme;
  const [style, setStyle] = useState(
    theme === 'light' ? { color: 'black' } : { color: '#fffffe' }
  );

  const gameOver = useStateContext().gameOver;
  const winning = useStateContext().winning;

  useEffect(() => {
    if (gameOver) {
      console.log('GAME OVER <<<<<<<<<<<');
      clearInterval(intervalId);
      setStartCounting(false);
    } else if (winning) {
      clearInterval(intervalId);
      setStartCounting(false);
    } else if (startCounting) {
      console.log('Start Counting <<<<<<<<<<<');
      setMinutes(0);
      setSeconds(0);
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
  }, [startCounting, gameOver]);

  useEffect(() => {
    if (clearCounter) {
      console.log('clearing counter');
      setMinutes(0);
      setSeconds(0);
    }
  }, [clearCounter]);

  useEffect(() => {
    if (theme === 'light') {
      setStyle((style) => ({ ...style, color: 'black' }));
    } else {
      setStyle((style) => ({ ...style, color: '#fffffe' }));
    }
  }, [theme]);

  return (
    <div style={style} className="counter">
      {minutes < 10 ? `0${minutes}` : minutes}:
      {seconds < 10 ? `0${seconds}` : seconds}
    </div>
  );
}

export default Counter;
