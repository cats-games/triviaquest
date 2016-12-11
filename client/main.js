'use strict';

import React from 'react';
import ReactDOM from 'react-dom';
import Gameinfo from './src/components/Gameinfo.jsx';
import Textfield from './src/components/Textfield.jsx';
import Grid from './src/components/Grid.jsx';
import App from './src/components/App.jsx';

function main() {
  return;
}

const element = (
  <div>
  <h1>
    REACT
  </h1>
  <nav>LUXURY NAV</nav>
  <App />
  </div>
);

ReactDOM.render(
  element,
  document.getElementById('main')
);
