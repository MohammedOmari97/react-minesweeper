import React, { useReducer, useContext } from 'react';

const StateContext = React.createContext();
const DispatchContext = React.createContext();

const reducer = (state, { type, payload }) => {
  if (type === 'SET_SOUNDS') {
    return { ...state, sounds: !state.sounds };
  } else if (type === 'SET_THEME') {
    return { ...state, theme: state.theme === 'light' ? 'dark' : 'light' };
  } else if (type === 'SET_GAME_OVER') {
    if (payload !== undefined) {
      return { ...state, gameOver: payload.gameOver };
    } else {
      return { ...state, gameOver: !state.gameOver };
    }
  } else if (type === 'SET_WINNING') {
    if (payload !== undefined) {
      return { ...state, winning: payload.winning };
    } else {
      return { ...state, winning: !state.winning };
    }
  } else if (type === 'SET_VIEW') {
    // console.log('changing view <<<<');
    // console.log(view);
    return { ...state, view: payload.view };
  } else if (type === 'TOGGLE_MODAL') {
    console.log('TOGGLE BABY <<<<<<<<<<<<<<<<<<<<<<<<<');
    return { ...state, showModal: !state.showModal };
  }
};

function MyContext({ children }) {
  const [state, dispatch] = useReducer(reducer, {
    theme: 'light',
    sounds: true,
    gameOver: false,
    winning: false,
    view: 'options',
    showModal: false
  });
  return (
    <StateContext.Provider value={state}>
      <DispatchContext.Provider value={dispatch}>
        {children}
      </DispatchContext.Provider>
    </StateContext.Provider>
  );
}

const useStateContext = () => {
  const context = useContext(StateContext);
  if (context === undefined) {
    throw new Error('useStateContext must be used within a StateProvider');
  }
  return context;
};

const useDispatchContext = () => {
  const context = useContext(DispatchContext);
  if (context === undefined) {
    throw new Error('useDispatchContext must be within a DispatchProvider');
  }
  return context;
};

export { MyContext, useStateContext, useDispatchContext };
