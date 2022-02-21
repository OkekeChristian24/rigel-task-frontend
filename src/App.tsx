import React, { useEffect } from 'react';
import SwapInterface from './views/SwapInterface';
import './style/app.css'
import { useSelector } from 'react-redux';
import { RootState } from './state/reducers';
import { StateType } from './state/reducers/reducers';

function App() {
  const state: StateType = useSelector((state: RootState) => state.allData);

  return (
    <div className="App">
      <SwapInterface/>
    </div>
  );
}

export default App;
