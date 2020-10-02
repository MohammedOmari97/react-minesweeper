import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import { useStateContext, useDispatchContext } from './Context';
// import X from '/emojis/crying.svg';

// console.log(X);

export default function () {
  const show = useStateContext().showModal;
  console.log(show);
  const dispatch = useDispatchContext();
  const theme = useStateContext().theme;

  useEffect(() => {
    console.log(document.querySelector('.modal-content'));
    if (theme === 'light') {
      console.log('light');
      document.querySelector('.modal-content').style.borderBottom =
        '5px solid #ffd51b';
      document.querySelector('.modal-content').style.backgroundColor =
        '#FFE253';
    } else {
      console.log('dark');
      document.querySelector('.modal-content').style.borderBottom =
        '5px solid rgb(33, 110, 255)';
      document.querySelector('.modal-content').style.backgroundColor =
        'rgb(79, 140, 255)';
    }
  }, [theme]);

  return (
    <div hidden={!show} class="modal">
      <div class="modal-content">
        <h2>React Minesweeper</h2>
        <p>
          React application that uses hooks to manage the state and game logic.
        </p>
        <p>
          The game is typically similar to the famous minesweeper, exactly the
          same rules, nothing unusual.
        </p>
        <p>
          This application is hosted by Netlify, and built using Create React
          App.
        </p>
        <p>
          Also this game was inspired by the amazing Google Proxx game which was
          introduced in Google I/O 2019.
        </p>
        <h4>Happy Playing!</h4>
        <button onClick={() => dispatch({ type: 'TOGGLE_MODAL' })}>
          <img src="./emojis/x.svg" alt="X logo" />
        </button>
      </div>
    </div>
  );
}
