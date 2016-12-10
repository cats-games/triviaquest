'use strict';


import React from 'react';
import ReactDOM from 'react-dom';
import Grid from './src/components/Grid.jsx';
/*import Gameinfo from './src/components/Gameinfo.jsx';
import Textfield from './src/components/Textfield.jsx';
*/
console.log('main.js file recognized');


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
  <Textfield />
  </div>
);

console.log(element);

ReactDOM.render(
  element,
  document.getElementById('main')
);