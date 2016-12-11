'use strict';

console.log('main.js file recognized');

import React from 'react';
import ReactDOM from 'react-dom';
import Grid from './src/components/Grid.jsx';
import Gameinfo from './src/components/Gameinfo.jsx';
import Textfield from './src/components/Textfield.jsx';

function main() {
  return;
}

const element = (
  <div>
  <h1>
    REACT
  </h1>
  <nav>LUXURY NAV</nav>
  <Grid />
  </div>
);

ReactDOM.render(
  element,
  document.getElementById('main')
);