import React, { useState, useEffect, useRef } from 'react';
import Cell from './Cell';
import Header from './Header';
import Footer from './Footer';
import { useStateContext, useDispatchContext } from './Context';

import Counter from './Counter';
// import useCounter from './useCounter';

// import Test from './Test';
import Emoji from './Emoji';

// import laugh from '../emojis/laugh.svg';
// import smile from '../emojis/smile.svg';
// import sad from '../emojis/sad.svg';

function Grid({ numBombs, gridWidth, gridHeight, dispatch }) {
  const isMounted = useRef(false);

  // console.log('rendering grid <<<');

  // const [emoji, setEmoji] = useState('smile');
  // const emojiRef = useRef();

  const gameOverRef = useRef();

  const [gameOverDisplay, setGameOverDisplay] = useState('none');
  const [winDisplay, setWinDisplay] = useState('none');

  const [startCounting, setStartCounting] = useState(false);
  const [clearCounter, setClearCounter] = useState(false);
  // const [Counter, setMinutes, setSeconds] = useCounter(startCounting);

  const theme = useStateContext().theme;
  const gameOver = useStateContext().gameOver;
  const winning = useStateContext().winning;

  const dispatchContext = useDispatchContext();

  const [bombsLeftStyle, setBombsLeftStyle] = useState(
    theme === 'light' ? { color: 'black' } : { color: '#fffffe' }
  );

  useEffect(() => {
    if (theme === 'light') {
      document.body.style.backgroundColor = '#fff';
      setBombsLeftStyle((bombsLeftStyle) => ({
        ...bombsLeftStyle,
        color: 'black'
      }));
    } else {
      document.body.style.backgroundColor = '#16161a';
      setBombsLeftStyle((bombsLeftStyle) => ({
        ...bombsLeftStyle,
        color: '#fffffe'
      }));
    }
  }, [theme]);

  const [revealedCells, setRevealedCells] = useState(
    new Array(gridWidth * gridHeight).fill(false)
  );

  const [safeCells, setSafeCells] = useState();
  const [allBombs, setAllBombs] = useState([]);
  const [allNeighbors, setAllNeighbors] = useState([]);

  useEffect(() => {
    // console.log('all neighbors changed');
    setSafeCells(() => {
      let allCells = new Array(gridWidth * gridHeight)
        .fill(0)
        .map((i, index) => i + index);
      let safeCells = allCells.filter((i) => !allBombs.includes(i));
      setSafeCells(() => safeCells);
    });
  }, [allNeighbors]);

  useEffect(() => {
    if (safeCells) {
      if (
        startCounting === false &&
        gameOver === false &&
        !revealedCells.every((cell) => cell === false)
      ) {
        // when starting the game
        setStartCounting(true);
        setClearCounter(false);
      }
      let isRevealed = safeCells.map((i) => revealedCells[i]);
      if (isRevealed.every((i) => i === true)) {
        // you win 🎉🎉🎉
        // show win component
        setWinDisplay(() => 'block');
        dispatchContext({ type: 'SET_WINNING', payload: { winning: true } });
        console.log('setting winning >> useEffect');
        setStartCounting(false);
      }
    }
  }, [revealedCells]);

  const update = (array, i, value) => {
    if (i === 0) {
      return [true, ...array.slice(1)];
    }
    let before = array.slice(0, i);
    let after = array.slice(i + 1);
    return [...before, value, ...after];
  };

  useEffect(() => {
    // if (isMounted.current) {
    // isMounted.current = false;
    console.log('rendering useEffect 😢😢');
    let bombs = [];
    for (let i = 0; i < numBombs; i++) {
      let random = Math.floor(Math.random() * (gridWidth * gridHeight));
      while (bombs.indexOf(random) !== -1) {
        random = Math.floor(Math.random() * (gridWidth * gridHeight));
      }
      bombs.push(random);
    }

    let neighbors = [];
    for (let i = 0; i < gridWidth * gridHeight; i++) {
      if (bombs.includes(i)) {
        neighbors[i] = 'bomb';
      } else {
        let col = i % gridWidth;
        let row = Math.floor(i / gridWidth);
        neighbors[i] = calcNeighbors(row, col);
      }
    }

    function calcNeighbors(row, col) {
      let bombsNum = 0;
      for (let iOff = -1; iOff <= 1; iOff++) {
        for (let jOff = -1; jOff <= 1; jOff++) {
          let j = row + jOff;
          let i = col + iOff;
          if (i > -1 && i < gridWidth && j > -1 && j < gridHeight) {
            if (bombs.includes(gridWidth * j + i)) {
              bombsNum++;
            }
          }
        }
      }
      return bombsNum;
    }

    setAllBombs(() => {
      return bombs;
    });
    setAllNeighbors(() => {
      return neighbors;
    });

    setSafeCells(() => {
      let allCells = new Array(gridWidth * gridHeight)
        .fill(0)
        .map((i, index) => i + index);
      let safeCells = allCells.filter((i) => !bombs.includes(i));
      setSafeCells(() => safeCells);
    });
    // }
    return () => {
      isMounted.current = true;
    };
  }, [gridWidth, gridHeight, numBombs]);

  const reset = (winOrLose) => {
    // resets the grid
    let bombs = [];
    for (let i = 0; i < numBombs; i++) {
      let random = Math.floor(Math.random() * (gridWidth * gridHeight));
      while (bombs.indexOf(random) !== -1) {
        random = Math.floor(Math.random() * (gridWidth * gridHeight));
      }
      bombs.push(random);
    }

    let neighbors = [];
    for (let i = 0; i < gridWidth * gridHeight; i++) {
      if (bombs.includes(i)) {
        neighbors[i] = 'bomb';
      } else {
        let col = i % gridWidth;
        let row = Math.floor(i / gridWidth);
        neighbors[i] = calcNeighbors(row, col);
      }
    }

    function calcNeighbors(row, col) {
      let bombsNum = 0;
      for (let iOff = -1; iOff <= 1; iOff++) {
        for (let jOff = -1; jOff <= 1; jOff++) {
          let j = row + jOff;
          let i = col + iOff;
          if (i > -1 && i < gridWidth && j > -1 && j < gridHeight) {
            if (bombs.includes(gridWidth * j + i)) {
              bombsNum++;
            }
          }
        }
      }
      return bombsNum;
    }

    setAllBombs(() => {
      return bombs;
    });
    setAllNeighbors(() => {
      return neighbors;
    });
    if (winOrLose === 'win') {
      dispatchContext({ type: 'SET_WINNING', payload: { winning: false } });
      console.log('setting winning <<<');
    } else {
      dispatchContext({ type: 'SET_GAME_OVER', payload: { gameOver: false } });
      console.log('reseting gameover <<<');
    }
    setRevealedCells(() => new Array(gridWidth * gridHeight).fill(false));
  };

  return (
    <>
      <Header />
      <Emoji cells={revealedCells} gameOver={gameOver} winning={winning} />
      {/* <div className="emoji">
        <img
          ref={emojiRef}
          src={require(`../emojis/${emoji}.svg`)}
          alt="laughing emoji"
        />
      </div> */}
      <div className="bombs-left" style={bombsLeftStyle}>
        {safeCells && safeCells.length} /{' '}
        {/* {revealedCells.filter((cell) => cell === true).length} */}
        {safeCells &&
          safeCells.reduce((acc, current) => {
            if (revealedCells[current]) {
              return acc + 1;
            } else {
              return acc;
            }
          }, 0)}
      </div>
      <div className="grid-container">
        <div
          className="grid"
          style={{
            display: 'grid',
            gridTemplateColumns: `repeat(${gridWidth}, 38px)`,
            gridTemplateRows: `repeat(${gridHeight}, 38px)`
          }}
        >
          {/* {allCells} */}
          {allNeighbors.map((neighbor, index) => {
            return (
              <Cell
                neighbors={neighbor}
                allNeighbors={allNeighbors}
                isMine={allBombs.includes(index)}
                touchBombs={!isNaN(neighbor) && neighbor > 0}
                row={index % gridWidth}
                col={Math.floor(index / gridWidth)}
                key={index}
                id={index}
                revealed={revealedCells[index]}
                setRevealedCells={setRevealedCells}
                revealedCells={revealedCells}
                update={update}
                width={gridWidth}
                height={gridHeight}
                setGameOverDisplay={setGameOverDisplay}
                setStartCounting={setStartCounting}
                // setEmoji={setEmoji}
              />
            );
          })}
        </div>
      </div>
      {/* <Test /> */}
      <Footer dispatch={dispatch} />
      {/* <div className="counter">00:00</div> */}
      {/* <Counter startCounting={startCounting ? 1000 : null} /> */}
      <Counter
        startCounting={startCounting}
        setStartCounting={setStartCounting}
        clearCounter={clearCounter}
      />
      <div
        style={{ display: gameOverDisplay }}
        ref={gameOverRef}
        className="game-over"
      >
        <button
          onClick={() => {
            reset('lose');
            // gameOverRef.current.style.display = 'none';
            setGameOverDisplay(() => 'none');
            setClearCounter(true);
          }}
        >
          TRY AGAIN
        </button>
        <button
          onClick={() => {
            reset('lose');
            dispatch({ type: 'SET_VIEW', payload: { view: 'options' } });
            setGameOverDisplay(() => 'none');
          }}
        >
          MAIN MENU
        </button>
      </div>
      <div style={{ display: winDisplay }} className="you-win">
        <button
          onClick={() => {
            reset('win');
            // dispatchContext({ type: 'SET_WINNING' });
            setWinDisplay(() => 'none');
            setClearCounter(true);
          }}
        >
          Go again!
        </button>
        <button
          onClick={() => {
            reset('win');
            dispatch({ type: 'SET_VIEW', payload: { view: 'options' } });
            setWinDisplay(() => 'none');
          }}
        >
          Main Menu
        </button>
      </div>
    </>
  );
}

export default Grid;
