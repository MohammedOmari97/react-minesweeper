import React, { memo, useState, useEffect, useRef } from 'react';
import useSound from 'use-sound';
import popSound from '../Pop-sound-effect.mp3';
import bomb from '../mine.svg';
import { useStateContext, useDispatchContext } from './Context';

// const areEqual = (prevProps, nextProps) => {
//   return (
//     prevProps.neighbors === nextProps.neighbors &&
//     prevProps.isMine === nextProps.isMine &&
//     prevProps.row === nextProps.row &&
//     prevProps.col === nextProps.col &&
//     prevProps.revealed === nextProps.revealed &&
//     prevProps.id === nextProps.id &&
//     prevProps.width === nextProps.width &&
//     prevProps.height === nextProps.height
//   );
// };

const Cell = memo(function Cell({
  neighbors,
  allNeighbors,
  isMine,
  row,
  col,
  revealed,
  setRevealedCells,
  revealedCells,
  update,
  id,
  width,
  height,
  setGameOverDisplay,
  setStartCounting,
  setEmoji
}) {
  const [innerText, setInnerText] = useState(isMine ? 'Mine' : neighbors);
  // const [isFlag, setIsFlag] = useState(false);
  const [classList, setClassList] = useState('cell');

  console.log('rendering cell <<<');

  const sounds = useStateContext().sounds;
  const theme = useStateContext().theme;
  const gameOver = useStateContext().gameOver;
  const winning = useStateContext().winning;
  const dispatch = useDispatchContext();
  const [play] = useSound(popSound);

  const isMounted = useRef(false);
  const cellRef = useRef();

  const [thisStyles, setThisStyles] = useState();
  const gameOverRef = useRef(false);
  const winningRef = useRef(false);

  useEffect(() => {
    if (gameOverRef.current) {
      if (gameOver === false) {
        setInnerText(() => {
          return isMine ? 'Mine' : neighbors;
        });
      }
    } else {
      gameOverRef.current = true;
    }
  }, [gameOver]);

  useEffect(() => {
    if (winningRef.current) {
      if (winning === false) {
        setInnerText(() => {
          return isMine ? 'Mine' : neighbors;
        });
      }
    } else {
      winningRef.current = true;
    }
  }, [winning]);

  useEffect(() => {
    if (!revealed) {
      if (theme === 'light') {
        setThisStyles(() => ({
          backgroundColor: '#fff',
          border: '1px solid #e6e6e6',
          borderBottom: '4px solid #e6e6e6',
          opacity: '.8'
        }));
      } else {
        setThisStyles(() => ({
          backgroundColor: '#fff',
          border: '1px solid #cccccc',
          borderBottom: '4px solid #cccccc'
        }));
      }
    } else {
      if (theme === 'light') {
        if (neighbors === 0) {
          setThisStyles((styles) => ({
            ...styles,
            backgroundColor: '#ededed',
            border: '1px solid #e3e3e3',
            borderBottom: '4px solid #e3e3e3',
            transition: 'background-color .2s ease',
            opacity: '.8'
          }));
        } else if (neighbors === 1) {
          setThisStyles((styles) => ({
            ...styles,
            backgroundColor: '#4f8cff',
            border: '1px #216eff solid',
            borderBottom: '4px #216eff solid',
            opacity: '.8'
          }));
        } else if (neighbors === 2) {
          setThisStyles((styles) => ({
            ...styles,
            backgroundColor: '#ffdd49',
            border: '1px #ffd51b solid',
            borderBottom: '4px #ffd51b solid',
            opacity: '.8'
          }));
        } else if (neighbors === 3) {
          setThisStyles((styles) => ({
            ...styles,
            backgroundColor: '#57cf4c',
            border: '1px #3dbb32 solid',
            borderBottom: '4px #3dbb32 solid',
            opacity: '.8'
          }));
        } else if (neighbors >= 4) {
          setThisStyles((styles) => ({
            ...styles,
            backgroundColor: '#4d4d4d',
            border: '1px #363636 solid',
            borderBottom: '4px #363636 solid',
            opacity: '.8'
          }));
        } else {
          setThisStyles(() => ({
            backgroundColor: 'transparent'
          }));
        }
      } else {
        if (neighbors === 0) {
          setThisStyles((styles) => ({
            ...styles,
            backgroundColor: '#4d4d4d',
            border: '1px solid #404040',
            borderBottom: '1px solid #404040',
            opacity: '1'
          }));
        } else if (neighbors === 1) {
          setThisStyles((styles) => ({
            ...styles,
            backgroundColor: '#4f8cff',
            border: '1px #216eff solid',
            borderBottom: '4px #216eff solid',
            opacity: '1'
          }));
        } else if (neighbors === 2) {
          setThisStyles((styles) => ({
            ...styles,
            backgroundColor: '#ffdd49',
            border: '1px #ffd51b solid',
            borderBottom: '4px #ffd51b solid',
            opacity: '1'
          }));
        } else if (neighbors === 3) {
          setThisStyles((styles) => ({
            ...styles,
            backgroundColor: '#57cf4c',
            border: '1px #3dbb32 solid',
            borderBottom: '4px #3dbb32 solid',
            opacity: '1'
          }));
        } else if (neighbors >= 4) {
          setThisStyles((styles) => ({
            ...styles,
            backgroundColor: '#4d4d4d',
            border: '1px #363636 solid',
            borderBottom: '4px #363636 solid',
            opacity: '1'
          }));
        } else {
          setThisStyles(() => ({
            backgroundColor: 'transparent'
          }));
        }
      }
    }
  }, [theme]);

  useEffect(() => {
    if (!revealed) {
      setThisStyles(() => ({
        backgroundColor: '#fff',
        border: '1px solid #e6e6e6',
        borderBottom: '4px solid #e6e6e6'
      }));
    } else {
      if (neighbors === 0) {
        if (theme === 'light') {
          setThisStyles((styles) => ({
            ...styles,
            backgroundColor: '#ededed',
            border: '1px solid #e3e3e3',
            transition: 'background-color .2s ease',
            borderBottom: '4px solid #e3e3e3'
          }));
        } else {
          setThisStyles((styles) => ({
            ...styles,
            backgroundColor: '#4d4d4d',
            border: '1px solid #404040',
            // borderBottom: '1px solid #404040',
            opacity: '1'
          }));
        }
      } else if (neighbors === 1) {
        setThisStyles((styles) => ({
          ...styles,
          backgroundColor: '#4f8cff',
          border: '1px #216eff solid',
          borderBottom: '4px #216eff solid'
        }));
      } else if (neighbors === 2) {
        setThisStyles((styles) => ({
          ...styles,
          backgroundColor: '#ffdd49',
          border: '1px #ffd51b solid',
          borderBottom: '4px #ffd51b solid'
        }));
      } else if (neighbors === 3) {
        setThisStyles((styles) => ({
          ...styles,
          backgroundColor: '#57cf4c',
          border: '1px #3dbb32 solid',
          borderBottom: '4px #3dbb32 solid'
        }));
      } else if (neighbors >= 4) {
        setThisStyles((styles) => ({
          ...styles,
          backgroundColor: '#4d4d4d',
          border: '1px #363636 solid',
          borderBottom: '4px #363636 solid'
        }));
      } else {
        setThisStyles(() => ({
          backgroundColor: 'transparent'
        }));
      }
    }
  }, [revealed]);

  const returnContent = (revealed) => {
    if (revealed) {
      if (innerText === 'Mine') {
        return <img className="cell-bomb" src={bomb} alt="bomb logo" />;
      } else {
        return innerText;
      }
    } else {
      return '   ';
    }
  };

  useEffect(() => {
    if (isMounted.current) {
      if (innerText === 0) {
        setClassList(() => `cell-empty`);
        setInnerText(() => '   ');
      } else if (innerText >= 5) {
        setClassList(() => `cell-5-plus`);
      } else if (innerText === 'Mine') {
        setClassList(() => 'cell-bomb-container');
      } else {
        setClassList(() => `cell-${neighbors}`);
      }

      if (revealed === false) {
        setInnerText(() => {
          return isMine ? 'Mine' : neighbors;
        });
        setClassList(() => 'cell');
      }
    } else {
      isMounted.current = true;
    }
  }, [revealed]);

  const getEmptyNeighborsRecursive = (emptyNeighbors) => {
    let temp = [...emptyNeighbors];
    let neighbors;
    for (let i = 0; i < emptyNeighbors.length; i++) {
      neighbors = [];
      neighbors = getEmptyNeighbors(
        emptyNeighbors[i] % width,
        Math.floor(emptyNeighbors[i] / width)
      );
      if (neighbors.length !== 0) {
        temp = temp.concat([...neighbors]);
        temp = [...new Set(temp)];
      }
    }
    if (temp.length !== emptyNeighbors.length) {
      return getEmptyNeighborsRecursive(temp);
    } else {
      let tempLength = temp.length;
      let temp2 = [];
      let index;
      for (let n = 0; n < tempLength; n++) {
        let col = temp[n] % width;
        let row = Math.floor(temp[n] / width);

        // get all the neighbors and push it to temp2
        for (let iOff = -1; iOff <= 1; iOff++) {
          for (let jOff = -1; jOff <= 1; jOff++) {
            let j = row + jOff;
            let i = col + iOff;
            if (i > -1 && i < width && j > -1 && j < height) {
              index = width * j + i;
              temp2.push(index);
            }
          }
        }
      }
      temp = [...new Set(temp.concat(temp2))];
      return temp;
    }
  };

  const getEmptyNeighbors = (col, row) => {
    let neighbors = [];
    let index;
    for (let iOff = -1; iOff <= 1; iOff++) {
      for (let jOff = -1; jOff <= 1; jOff++) {
        let j = row + jOff;
        let i = col + iOff;
        if (i > -1 && i < width && j > -1 && j < height) {
          index = width * j + i;
          if (allNeighbors[index] === 0) {
            neighbors.push(index);
          }
        }
      }
    }
    return neighbors;
  };

  return (
    <div
      className={classList}
      style={thisStyles}
      ref={cellRef}
      // onMouseDown={() => setEmoji('laugh')}
      // onMouseUp={() => setEmoji('smile')}
      // onMouseLeave={() => setEmoji('smile')}
      onClick={() => {
        if (!revealed) {
          if (sounds) {
            play();
          }

          let emptyNeighbors;
          if (innerText === 0) {
            // setTimeout(() => {
            //   setEmoji('laugh');
            //   setTimeout(() => {
            //     setEmoji('smile');
            //   }, 500);
            // }, 0);
            emptyNeighbors = getEmptyNeighbors(row, col);
            if (emptyNeighbors.length !== 0) {
              emptyNeighbors = getEmptyNeighborsRecursive(emptyNeighbors);
              let temp = [...revealedCells];
              for (let i = 0; i < emptyNeighbors.length; i++) {
                temp = update(temp, emptyNeighbors[i], true);
              }

              setRevealedCells(() => {
                return temp;
              });
            } else {
              setRevealedCells((revealedCells) => {
                return update(revealedCells, id, true);
              });
            }
          } else if (innerText === 'Mine') {
            // setEmoji('sad');
            dispatch({ type: 'SET_GAME_OVER' });
            setStartCounting(false);
            setGameOverDisplay(() => 'block');
            let temp = [...revealedCells];
            let allBombs = allNeighbors
              .map((cell, i) => {
                if (cell === 'bomb') {
                  return i;
                }
              })
              .filter((cell) => cell !== undefined);
            for (let i = 0; i < allBombs.length; i++) {
              temp = update(temp, allBombs[i], true);
            }
            setRevealedCells(() => {
              return temp;
            });
          } else {
            setRevealedCells((revealedCells) => {
              return update(revealedCells, id, true);
            });
          }
        }
      }}
    >
      {/* {revealed ? innerText : '   '} */}
      {returnContent(revealed)}
    </div>
  );
});

export default Cell;
