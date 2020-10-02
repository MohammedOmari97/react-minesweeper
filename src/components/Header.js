import React, { useEffect, useState } from 'react';
// import soundOn from '../volume-2.svg';
// import soundOff from '../volume.svg';
import sun from '../sun.svg';
import moon from '../moon-dark-mode.svg';
// import moon from '../moon.svg';
import soundOn from '../volume (1).svg';
import soundOnDarkMode from '../volume-dark-mode.svg';
import soundOffDarkMode from '../volume-off-dark-mode.svg';
import soundOff from '../volume-off.svg';

import { useStateContext, useDispatchContext } from './Context';

const Header = (props) => {
  const theme = useStateContext().theme;
  const sounds = useStateContext().sounds;
  const dispatch = useDispatchContext();

  const [styles, setStyles] = useState({ backgroundColor: 'transparent' });

  // console.log('rendering Header <<<');

  useEffect(() => {
    if (theme === 'light') {
      console.log('white <<<<<<<<<<<<');
      document.querySelector('.header').style.backgroundColor = '#fff';
      setStyles((styles) => ({ ...styles, backgroundColor: '#fff' }));
    } else {
      console.log('dark <<<<<<<<<');
      document.querySelector('.header').style.backgroundColor = '#16161a';
      setStyles((styles) => ({ ...styles, backgroundColor: '#16161a' }));
    }
  }, [theme]);

  return (
    <div style={styles} className="header">
      {/* <div className="bombs-left">10 / 50</div> */}
      <div
        onClick={() => {
          dispatch({ type: 'SET_THEME' });
        }}
        className="toggle-night-mode-container"
      >
        {theme === 'light' ? (
          <img
            className="toggle-night-mode sun"
            src={sun}
            alt="day mode logo"
          />
        ) : (
          <img
            className="toggle-night-mode moon"
            src={moon}
            alt="day mode logo"
          />
        )}
      </div>
      <div
        onClick={() => dispatch({ type: 'SET_SOUNDS' })}
        className="toggle-sounds-container"
      >
        {sounds ? (
          theme === 'light' ? (
            <img className="toggle-sounds" src={soundOn} alt="sounds on logo" />
          ) : (
            <img
              className="toggle-sounds"
              src={soundOnDarkMode}
              alt="sounds on logo"
            />
          )
        ) : theme === 'light' ? (
          <img className="toggle-sounds" src={soundOff} alt="sounds on logo" />
        ) : (
          <img
            className="toggle-sounds"
            src={soundOffDarkMode}
            alt="sounds on logo"
          />
        )}
      </div>
    </div>
  );
};

export default Header;
