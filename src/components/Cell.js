import React, { memo, useState, useEffect, useRef } from 'react';
import useSound from 'use-sound';
import popSound from '../Pop-sound-effect.mp3';
import bomb from '../mine.svg';
import { useStateContext, useDispatchContext } from './Context';

// const root = document.documentElement;

const areEqual = (prevProps, nextProps) => {
  console.log(
    'isMine ' + (prevProps.isMine === nextProps.isMine) + '\n',
    'row ' + (prevProps.row === nextProps.row) + '\n',
    'col ' + (prevProps.col === nextProps.col) + '\n',
    'allNeighbors ' +
      (prevProps.allNeighbors === nextProps.allNeighbors) +
      '\n',
    'neighbors ' + (prevProps.neighbors === nextProps.neighbors) + '\n',
    'isMine ' + (prevProps.isMine === nextProps.isMine) + '\n',
    'row ' + (prevProps.row === nextProps.row) + '\n',
    'col ' + (prevProps.col === nextProps.col) + '\n',
    'revealed ' + (prevProps.revealed === nextProps.revealed) + '\n',
    'id ' + (prevProps.id === nextProps.id) + '\n',
    'width ' + (prevProps.width === nextProps.width) + '\n',
    'height ' + (prevProps.height === nextProps.height)
  );
  return false;
};

const Cell = memo(function Cell({
  // function Cell({
  neighbors,
  allNeighbors,
  isMine,
  touchBombs,
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
  // const [innerText, setInnerText] = useState(isMine ? 'Mine' : neighbors);
  // const [isFlag, setIsFlag] = useState(false);
  // const [classList, setClassList] = useState('cell');

  console.log('rendering cell 🔴🔴🔴');

  const { sounds, theme, gameOver, winning } = useStateContext();
  const dispatch = useDispatchContext();
  const [play] = useSound(popSound);

  // const isMounted = useRef(false);
  const cellRef = useRef();

  // const [thisStyles, setThisStyles] = useState();
  const gameOverRef = useRef(false);
  const winningRef = useRef(false);

  useEffect(() => {
    if (gameOverRef.current) {
      if (gameOver === false) {
        // setInnerText(() => {
        //   return isMine ? 'Mine' : neighbors;
        // });
      }
    } else {
      gameOverRef.current = true;
    }
  }, [gameOver]);

  useEffect(() => {
    if (winningRef.current) {
      if (winning === false) {
        // innerText >>>
        // setInnerText(() => {
        //   return isMine ? 'Mine' : neighbors;
        // });
      }
    } else {
      winningRef.current = true;
    }
  }, [winning]);

  useEffect(() => {
    let cell = document.body.querySelector(
      `[data-row="${row}"][data-col="${col}"]`
    );
    if (neighbors === 0) {
      if (revealed) {
        if (theme === 'light') {
          cell.classList = 'cell-revealed-light';
        } else {
          cell.classList = 'cell-revealed-dark';
        }
      }
    }
  }, [theme]);

  const returnContent = (revealed) => {
    // console.log('returning content <<<<<<<<');
    let cell = document.body.querySelector(
      `[data-row="${row}"][data-col="${col}"]`
    );
    if (revealed) {
      if (neighbors === 'bomb') {
        return <img className="cell-bomb" src={bomb} alt="bomb logo" />;
      } else {
        if (neighbors === 0) {
          if (theme === 'light') {
            cell.classList = 'cell-revealed-light';
          } else {
            cell.classList = 'cell-revealed-dark';
          }
          return '';
        } else {
          if (neighbors >= 4) {
            cell.classList = 'cell-4';
            cell.innerText = neighbors;
          } else {
            // console.log('setting class');
            cell.classList = `cell-${neighbors}`;
            cell.innerText = neighbors;
          }
          return neighbors;
        }
      }
    } else {
      return '';
    }
  };

  useEffect(() => {
    // console.log(row, col);
    let cell = document.body.querySelector(
      `[data-row="${row}"][data-col="${col}"]`
    );
    if (revealed) {
      if (touchBombs) {
        // innerText >>>
        if (neighbors >= 4) {
          cell.classList = 'cell-4';
          cell.innerText = neighbors;
        } else {
          // console.log('setting class');
          cell.classList = `cell-${neighbors}`;
          cell.innerText = neighbors;
        }
      } else if (neighbors === 'bomb') {
        cell.classList = 'cell-bomb-container';
        if (!gameOver) {
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
          // for (let i = 0; i < temp.length; i++) {
          //   let cell = document.body.querySelector(
          //     `[data-row="${temp[i] % width}"][data-col="${Math.floor(
          //       temp[i] / width
          //     )}"]`
          //   );
          //   if (allNeighbors[temp[i]] === 0) {
          //     cell.classList = 'cell-revealed-light';
          //   } else if (allNeighbors[temp[i]] >= 4) {
          //     cell.classList = 'cell-4';
          //     cell.innerText = allNeighbors[temp[i]];
          //   } else if (allNeighbors[temp[i]] > 0 && allNeighbors[temp[i]] < 4) {
          //     cell.classList = `cell-${allNeighbors[temp[i]]}`;
          //     cell.innerText = allNeighbors[temp[i]];
          //   }
          // }
          setRevealedCells(() => {
            return temp;
          });
        }
      } else {
        if (theme === 'light') {
          cell.classList = 'cell-revealed-light';
        } else {
          cell.classList = 'cell-revealed-dark';
        }
        let safeNeighbors = getEmptyNeighbors2(row, col);
        // console.log(safeNeighbors);
        // let temp = [...revealedCells];
        // for (let i = 0; i < safeNeighbors.length; i++) {
        //   temp = update(temp, safeNeighbors[i], true);
        // }
        // console.log(temp);
        // console.log('******************************************');
        // todo >>>
        setRevealedCells((prevState) => {
          let temp = [...prevState];
          for (let i = 0; i < safeNeighbors.length; i++) {
            // todo >>>
            temp = update(temp, safeNeighbors[i], true);
          }
          return temp;
        });
        // for (let i = 0; i < safeNeighbors.length; i++) {
        //   let cell = document.body.querySelector(
        //     `[data-row="${safeNeighbors[i] % width}"][data-col="${Math.floor(safeNeighbors[i] / width)}"]`
        //   );
        // }
        // reveale all the neighbors
      }

      // if (innerText === 0) {
      //   if (theme === 'light') {
      //     cell.classList = 'cell-revealed-light';
      //   } else {
      //     cell.classList = 'cell-revealed-dark';
      //   }
      // } else if (innerText >= 4) {
      //   cell.classList = 'cell-4';
      // } else if (innerText === 'Mine') {
      //   cell.classList = 'cell-bomb-container';
      // } else {
      //   cell.classList = `cell-${neighbors}`;
      // }
    } else {
      // setInnerText(() => {
      //   return isMine ? 'Mine' : neighbors;
      // });
      // if (revealed) {
      //   cell.innerText = isMine ? 'Mine' : neighbors;
      // }
      cell.classList = 'cell';
    }
  }, [revealed]);

  // const getEmptyNeighborsRecursive = (emptyNeighbors) => {
  //   let temp = [...emptyNeighbors];
  //   let neighbors;
  //   for (let i = 0; i < emptyNeighbors.length; i++) {
  //     neighbors = [];
  //     neighbors = getEmptyNeighbors(
  //       emptyNeighbors[i] % width,
  //       Math.floor(emptyNeighbors[i] / width)
  //     );
  //     if (neighbors.length !== 0) {
  //       temp = temp.concat([...neighbors]);
  //       temp = [...new Set(temp)];
  //     }
  //   }
  //   if (temp.length !== emptyNeighbors.length) {
  //     return getEmptyNeighborsRecursive(temp);
  //   } else {
  //     let tempLength = temp.length;
  //     let temp2 = [];
  //     let index;
  //     for (let n = 0; n < tempLength; n++) {
  //       let col = temp[n] % width;
  //       let row = Math.floor(temp[n] / width);

  //       // get all the neighbors and push it to temp2
  //       for (let iOff = -1; iOff <= 1; iOff++) {
  //         for (let jOff = -1; jOff <= 1; jOff++) {
  //           let j = row + jOff;
  //           let i = col + iOff;
  //           if (i > -1 && i < width && j > -1 && j < height) {
  //             index = width * j + i;
  //             temp2.push(index);
  //           }
  //         }
  //       }
  //     }
  //     temp = [...new Set(temp.concat(temp2))];
  //     return temp;
  //   }
  // };

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

  const getEmptyNeighbors2 = (col, row) => {
    console.log('➡ ➡ ➡');
    let neighbors = [];
    let index;
    for (let iOff = -1; iOff <= 1; iOff++) {
      for (let jOff = -1; jOff <= 1; jOff++) {
        let j = row + jOff;
        let i = col + iOff;
        if (i > -1 && i < width && j > -1 && j < height) {
          index = width * j + i;
          if (allNeighbors[index] !== 'bomb') {
            neighbors.push(index);
          }
        }
      }
    }
    return neighbors;
  };

  return (
    <div
      // className={classList}
      className="cell"
      data-row={row}
      data-col={col}
      // style={thisStyles}
      ref={cellRef}
      // onMouseDown={() => setEmoji('laugh')}
      // onMouseUp={() => setEmoji('smile')}
      // onMouseLeave={() => setEmoji('smile')}
      onClick={() => {
        if (!winning && !gameOver) {
          if (!revealed) {
            if (sounds) {
              play();
            }
            let cell = document.body.querySelector(
              `[data-row="${row}"][data-col="${col}"]`
            );
            if (neighbors === 0) {
              // setInnerText('');
              if (theme === 'light') {
                cell.classList = 'cell-revealed-light';
              } else {
                cell.style.classList = 'cell-revealed-dark';
              }
            } else if (neighbors === 1) {
              // console.log('setting cell 1 <<<<<<<<<<<<<<<');
              // console.log(cell.style.classList);
              cell.classList = 'cell-1';
              // console.log(cell.style.classList);
            } else if (neighbors === 2) {
              cell.classList = 'cell-2';
            } else if (neighbors === 3) {
              cell.classList = 'cell-3';
            } else if (neighbors >= 4) {
              cell.classList = 'cell-4';
            }

            // let emptyNeighbors;
            // if (innerText === 0) {
            // setTimeout(() => {
            //   setEmoji('laugh');
            //   setTimeout(() => {
            //     setEmoji('smile');
            //   }, 500);
            // }, 0);

            // <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<

            // emptyNeighbors = getEmptyNeighbors(row, col);
            // if (emptyNeighbors.length !== 0) {
            //   emptyNeighbors = getEmptyNeighborsRecursive(emptyNeighbors);
            //   let temp = [...revealedCells];
            //   for (let i = 0; i < emptyNeighbors.length; i++) {
            //     temp = update(temp, emptyNeighbors[i], true);
            //   }

            //   setRevealedCells(() => {
            //     return temp;
            //   });
            // } else {
            //   setRevealedCells((revealedCells) => {
            //     return update(revealedCells, id, true);
            //   });
            // }
            // } else if (innerText === 'Mine') {
            // setEmoji('sad');
            // dispatch({ type: 'SET_GAME_OVER' });
            // setStartCounting(false);
            // setGameOverDisplay(() => 'block');
            // let temp = [...revealedCells];
            // let allBombs = allNeighbors
            // .map((cell, i) => {
            // if (cell === 'bomb') {
            // return i;
            // }
            // })
            // .filter((cell) => cell !== undefined);
            // for (let i = 0; i < allBombs.length; i++) {
            // temp = update(temp, allBombs[i], true);
            // }
            // setRevealedCells(() => {
            // return temp;
            // });
            // } else {
            // setRevealedCells((revealedCells) => {
            //   return update(revealedCells, id, true);
            // });
            // }

            // <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<

            setRevealedCells(() => {
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
  // }
});

export default Cell;
