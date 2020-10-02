import React, { useState, useEffect, useReducer } from 'react';
import Grid from './Grid';
import Options from './Options';

import '../styles/App.scss';
import InfoModal from './InfoModal';

const initialState = {
  // view: 'grid',
  view: 'options',
  difficulty: 'custom',
  numBombs: 5,
  width: 15,
  height: 15
};

const reducer = (state, { type, payload }) => {
  if (type === 'SET_VIEW') {
    return { ...state, view: payload.view };
  }
  if (type === 'SET_DIFFICULTY') {
    return { ...state, difficulty: payload.difficulty };
  }
  if (type === 'SET_NUM_BOMBS') {
    return { ...state, numBombs: payload.numBombs };
    // if (payload.numBombs === 10) {
    //   return { ...state, numBombs: payload.numBombs, difficulty: 'easy' };
    // } else if (payload.numBombs === 20) {
    //   return { ...state, numBombs: payload.numBombs, difficulty: 'medium' };
    // } else if (payload.numBombs === 30) {
    //   return { ...state, numBombs: payload.numBombs, difficulty: 'hard' };
    // } else
    //   return { ...state, numBombs: payload.numBombs, difficulty: 'custom' };
  }
  if (type === 'SET_WIDTH') {
    console.log(payload.width);
    return { ...state, width: payload.width };
  }
  if (type === 'SET_HEIGHT') {
    console.log(payload.height);
    return { ...state, height: payload.height };
  }
};

function App() {
  const [state, dispatch] = useReducer(reducer, initialState);

  console.log('rendering app');

  return (
    <div className="App">
      {state.view === 'options' ? (
        <Options dispatch={dispatch} state={state} />
      ) : (
        <Grid
          numBombs={state.numBombs}
          gridWidth={state.width}
          gridHeight={state.height}
          dispatch={dispatch}
        />
      )}
      <InfoModal />
    </div>
  );
}

export default App;
