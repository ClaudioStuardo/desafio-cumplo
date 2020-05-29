import React from 'react';
import logo from './logo.svg';

import LineChart from './components/LineChart';

import './App.scss';

function App() {
  return (
    <div className="App">

      <header className ="menu-top">
        <div className="menu-top__center">
          <div className="menu-top__center__logo">

            <img className="menu-top__center__logo-left" src={logo} alt="Desafío Front" />
            <span className="menu-top__center__logo-brand">
                <strong>Desafío</strong>Front
            </span>

          </div>

          <div className="clearfix"></div>

        </div>
      </header>

      <div className="slider">
        <h1>Desafío técnico desarrollado por Claudio Stuardo</h1>
      </div>

      <div className="chart">
        <LineChart />
      </div>

    </div>
  );
}

export default App;
