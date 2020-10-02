import React, { useState, useEffect } from 'react';
import info from '../info (1).svg';
import maximize from '../maximize (2).svg';
import maximizeDarkMode from '../maximize-dark-mode.svg';
import infoDarkMode from '../info-dark-mode.svg';
import leftArrow from '../arrow-left.svg';
import leftArrowLight from '../arrow-left-light.svg';

import { useStateContext, useDispatchContext } from './Context';

const Footer = ({ dispatch }) => {
  // console.log('rendering Footer');

  const theme = useStateContext().theme;
  const view = useStateContext().view;
  const dispatchContext = useDispatchContext();

  const [styles, setStyles] = useState(
    theme === 'light'
      ? { backgroundColor: '#fff' }
      : { backgroundColor: '#16161a' }
  );

  useEffect(() => {
    if (theme === 'light') {
      setStyles((styles) => ({ ...styles, backgroundColor: '#fff' }));
    } else {
      setStyles((styles) => ({ ...styles, backgroundColor: '#16161a' }));
    }
  }, [theme]);

  return (
    <div style={styles} className="footer">
      {theme === 'light' ? (
        view === 'options' ? (
          <img
            onClick={() => {
              // dispatch({ type: 'SET_VIEW', payload: { view: 'grid' } });
              // dispatchContext({ type: 'SET_VIEW', payload: { view: 'grid' } });
              dispatchContext({ type: 'TOGGLE_MODAL' });
              console.log('*************************');
            }}
            className="info"
            src={info}
            alt="info logo"
            style={{ fill: '#fff' }}
          />
        ) : (
          <img
            onClick={() => {
              dispatch({ type: 'SET_VIEW', payload: { view: 'options' } });
              dispatchContext({
                type: 'SET_VIEW',
                payload: { view: 'options' }
              });
              dispatchContext({
                type: 'SET_WINNING',
                payload: { value: false }
              });
              dispatchContext({
                type: 'SET_GAME_OVER',
                payload: { value: false }
              });
            }}
            className="info"
            src={leftArrow}
            alt="go back arrow"
            style={{ fill: '#fff' }}
          />
        )
      ) : view === 'options' ? (
        <img
          className="info"
          src={infoDarkMode}
          alt="info logo"
          onClick={() => dispatchContext({ type: 'TOGGLE_MODAL' })}
        />
      ) : (
        <img
          onClick={() => {
            dispatch({ type: 'SET_VIEW', payload: { view: 'options' } });
            dispatchContext({
              type: 'SET_VIEW',
              payload: { view: 'options' }
            });
            dispatchContext({
              type: 'SET_WINNING',
              payload: { value: false }
            });
            dispatchContext({
              type: 'SET_GAME_OVER',
              payload: { value: false }
            });
          }}
          className="info"
          src={leftArrowLight}
          alt="go back arrow"
        />
      )}
      {/* <div className="counter">10:00</div> */}
      {theme === 'light' ? (
        <img
          onClick={() => document.documentElement.requestFullscreen()}
          className="full-screen"
          src={maximize}
          alt="full-screen logo"
        />
      ) : (
        <img
          className="full-screen"
          src={maximizeDarkMode}
          alt="full-screen logo"
          onClick={() => document.documentElement.requestFullscreen()}
        />
      )}
    </div>
  );
};

export default Footer;
