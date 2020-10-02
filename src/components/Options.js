import React, { useEffect, useRef, useState } from 'react';
import Header from './Header';
import Footer from './Footer';

import { useStateContext } from './Context';
import { useDispatchContext } from './Context';

import useWindowSize from '../utils/useWindowSize';

// const Options = ({ setView, setNumBombs, difficulty, setDifficulty, setWidth, setHeight }) => {
const Options = ({ state, dispatch }) => {
  const bombsNumRef = useRef();

  const theme = useStateContext().theme;
  const dispatchContext = useDispatchContext();

  const { width, height } = useWindowSize();
  const [maxWidth, setMaxWidth] = useState(5);
  const [maxHeight, setMaxHeight] = useState(5);
  // const maxWidth = Math.floor((width - 5 * 2) / (38 + 8));
  // const maxHeight = Math.floor((height - 40 - 72) / (38 + 8));
  // dispatch({ type: 'SET_WIDTH', payload: { width: Math.floor(maxWidth / 2) } });
  // dispatch({
  //   type: 'SET_HEIGHT',
  //   payload: { height: Math.floor(maxHeight / 2) }
  // });

  console.log('rendering options');

  const [styles, setStyles] = useState(
    theme === 'light'
      ? {
          backgroundColor: '#ffdd49',
          border: '1px #ffd51b solid',
          borderBottom: '5px #ffd51b solid',
          opacity: '.8'
        }
      : {
          backgroundColor: '#4f8cff',
          border: '1px #216eff solid',
          borderBottom: '5px #216eff solid',
          opacity: '1',
          color: 'rgba(0, 0, 0, .7)'
        }
  );

  const [labelStyles, setLableStyles] = useState(
    theme === 'light' ? { opacity: '.8' } : { opacity: '1' }
  );

  useEffect(() => {
    const maxWidth = Math.floor((width - 5 * 2) / (38 + 8));
    const maxHeight = Math.floor((height - 40 - 72) / (38 + 8));
    setMaxWidth(maxWidth);
    setMaxHeight(maxHeight);
    dispatch({
      type: 'SET_WIDTH',
      payload: { width: Math.floor(maxWidth / 2) }
    });
    dispatch({
      type: 'SET_HEIGHT',
      payload: { height: Math.floor(maxHeight / 2) }
    });
  }, [width, height]);

  useEffect(() => {
    if (theme === 'light') {
      setStyles((styles) => ({
        ...styles,
        backgroundColor: '#ffdd49',
        border: '1px #ffd51b solid',
        borderBottom: '5px #ffd51b solid',
        opacity: '.8',
        color: 'rgba(0, 0, 0, 1)'
      }));
      setLableStyles(() => ({ opacity: '.8' }));
      document.body.style.backgroundColor = '#fff';
    } else {
      setStyles((styles) => ({
        ...styles,
        backgroundColor: '#4f8cff',
        border: '1px #216eff solid',
        borderBottom: '5px #216eff solid',
        opacity: '1',
        color: 'rgba(0, 0, 0, .7)'
      }));
      setLableStyles((styles) => ({
        opacity: '1',
        color: 'rgba(0, 0, 0, .7)'
      }));
      document.body.style.backgroundColor = '#16161a';
    }
  }, [theme]);

  useEffect(() => {
    // console.log(state.difficulty);
    if (state.difficulty === 'easy') {
      console.log('easy');
      console.log(width);
      dispatch({ type: 'SET_DIFFICULTY', payload: { difficulty: 'easy' } });
      if (width > 600) {
        console.log(maxWidth, maxHeight);
        console.log(Math.floor((((maxWidth / 2) * maxHeight) / 2) * 0.07));
        dispatch({
          type: 'SET_WIDTH',
          payload: { width: Math.floor(maxWidth / 2) }
        });
        dispatch({
          type: 'SET_HEIGHT',
          payload: { height: Math.floor(maxHeight / 1.1) }
        });
        dispatch({
          type: 'SET_NUM_BOMBS',
          payload: {
            numBombs: Math.floor((((maxWidth / 2) * maxHeight) / 2) * 0.07)
          }
        });
      } else {
        dispatch({
          type: 'SET_WIDTH',
          payload: { width: maxWidth }
        });
        dispatch({
          type: 'SET_HEIGHT',
          payload: { height: maxHeight }
        });
        dispatch({
          type: 'SET_NUM_BOMBS',
          payload: {
            numBombs: Math.ceil(maxWidth * maxHeight * 0.02)
          }
        });
      }
      // dispatch({ type: 'SET_NUM_BOMBS', payload: { numBombs: 10 } });
    } else if (state.difficulty === 'medium') {
      console.log('medium');
      dispatch({ type: 'SET_DIFFICULTY', payload: { difficulty: 'medium' } });
      if (width > 600) {
        dispatch({
          type: 'SET_WIDTH',
          payload: { width: Math.floor(maxWidth / 2) }
        });
        dispatch({
          type: 'SET_HEIGHT',
          payload: { height: Math.floor(maxHeight / 1.1) }
        });
        dispatch({
          type: 'SET_NUM_BOMBS',
          payload: {
            numBombs: Math.floor((((maxWidth / 2) * maxHeight) / 1.1) * 0.08)
          }
        });
      } else {
        dispatch({
          type: 'SET_WIDTH',
          payload: { width: maxWidth }
        });
        dispatch({
          type: 'SET_HEIGHT',
          payload: { height: maxHeight }
        });
        dispatch({
          type: 'SET_NUM_BOMBS',
          payload: {
            numBombs: Math.floor(maxWidth * maxHeight * 0.1)
          }
        });
      }
      // dispatch({ type: 'SET_NUM_BOMBS', payload: { numBombs: 20 } });
    } else if (state.difficulty === 'hard') {
      console.log('hard');
      dispatch({ type: 'SET_DIFFICULTY', payload: { difficulty: 'hard' } });
      if (width > 600) {
        dispatch({
          type: 'SET_WIDTH',
          payload: { width: Math.floor(maxWidth / 2) }
        });
        dispatch({
          type: 'SET_HEIGHT',
          payload: { height: Math.floor(maxHeight / 1.2) }
        });
        dispatch({
          type: 'SET_NUM_BOMBS',
          payload: {
            numBombs: Math.floor((((maxWidth / 2) * maxHeight) / 1.1) * 0.16)
          }
        });
      } else {
        dispatch({
          type: 'SET_WIDTH',
          payload: { width: maxWidth }
        });
        dispatch({
          type: 'SET_HEIGHT',
          payload: { height: maxHeight }
        });
        dispatch({
          type: 'SET_NUM_BOMBS',
          payload: {
            numBombs: Math.floor(maxWidth * maxHeight * 0.18)
          }
        });
      }
      // dispatch({ type: 'SET_NUM_BOMBS', payload: { numBombs: 30 } });
    } else if (state.difficulty === 'custom') {
      console.log('custom');
      dispatch({ type: 'SET_DIFFICULTY', payload: { difficulty: 'custom' } });
      dispatch({
        type: 'SET_NUM_BOMBS',
        payload: { numBombs: bombsNumRef.current.value }
      });
    }
  }, [state.difficulty, dispatch, maxWidth, maxHeight]);

  return (
    <>
      <Header />
      <div className="options">
        <label className="difficulty-label">
          <span style={labelStyles}>Difficulty</span>
          <select
            style={styles}
            className="difficulty"
            value={state.difficulty}
            onChange={(event) =>
              dispatch({
                type: 'SET_DIFFICULTY',
                payload: { difficulty: event.target.value }
              })
            }
          >
            <option value="easy">Easy</option>
            <option value="medium">Medium</option>
            <option value="hard">Hard</option>
            <option value="custom">Custom</option>
          </select>
        </label>
        <div className="height-width">
          <label className="grid-width-label">
            <span style={labelStyles}>Grid width</span>
            <input
              style={styles}
              className="grid-width"
              max={maxWidth}
              min={5}
              type="number"
              value={state.width}
              onChange={(event) =>
                dispatch({
                  type: 'SET_WIDTH',
                  payload: { width: event.target.value }
                })
              }
            />
          </label>
          <label className="grid-height-label">
            <span style={labelStyles}>Grid height</span>
            <input
              style={styles}
              className="grid-height"
              max={maxHeight}
              min={5}
              type="number"
              value={state.height}
              onChange={(event) =>
                dispatch({
                  type: 'SET_HEIGHT',
                  payload: { height: event.target.value }
                })
              }
            />
          </label>
        </div>
        <label className="bombs-num-label">
          <span style={labelStyles}>Bombs Number</span>
          <input
            style={styles}
            className="bombs-num"
            type="number"
            value={state.numBombs}
            ref={bombsNumRef}
            onChange={(event) => {
              dispatch({
                type: 'SET_NUM_BOMBS',
                payload: { numBombs: Number(event.target.value) }
              });
              dispatch({
                type: 'SET_DIFFICULTY',
                payload: { difficulty: 'custom' }
              });
            }}
          />
        </label>
        <button
          style={styles}
          className="start-playing"
          onClick={() => {
            dispatch({ type: 'SET_VIEW', payload: { view: 'grid' } }); // playing
            dispatchContext({ type: 'SET_VIEW', payload: { view: 'grid' } });
          }}
        >
          Play
        </button>
      </div>
      <Footer />
    </>
  );

  // const [difficulty, setDifficulty] = useState('easy');
  // const [width, setWidth] = useState(10);
  // const [height, setHeight] = useState(10);
  // const [minesNum, setMinesNum] = useState(10);

  // const minesNumRef = useRef();

  // useEffect(() => {
  //   // console.log(difficulty);
  //   if (difficulty === 'easy') {
  //     setNumBombs(10);
  //   } else if (difficulty === 'medium') {
  //     setNumBombs(20);
  //   } else if (difficulty === 'hard') {
  //     setNumBombs(30);
  //   } else if (difficulty === 'custom') {
  //     setNumBombs(minesNumRef.value);
  //   }
  // }, [difficulty, setDifficulty, setNumBombs]);

  // return (
  //   <div className="options">
  //     <select
  //       className="difficulty"
  //       value={difficulty}
  //       onChange={event => setDifficulty(event.target.value)}
  //     >
  //       <option value="easy">Easy</option>
  //       <option value="medium">Medium</option>
  //       <option value="hard">Hard</option>
  //       <option value="custom">Custom</option>
  //     </select>
  //     <input
  //       className="grid-width"
  //       type="number"
  //       value={width}
  //       onChange={event => setWidth(event.target.value)}
  //     />
  //     <input
  //       className="grid-height"
  //       type="number"
  //       value={height}
  //       onChange={event => setHeight(event.target.value)}
  //     />
  //     <input
  //       className="mines-num"
  //       type="number"
  //       value={minesNum}
  //       onChange={event => setMinesNum(event.target.value)}
  //       ref={minesNumRef}
  //     />
  //     <button
  //       onClick={() => {
  //         setView('playing');
  //       }}
  //     >
  //       Play
  //     </button>
  //   </div>
  // );
};

export default Options;
