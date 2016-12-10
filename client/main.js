'use strict';

console.log('main.js file recognized');

import React from 'react';
import ReactDOM from 'react-dom';
import Grid from './src/components/Grid.jsx';
import Gameinfo from './src/components/Gameinfo.jsx';
import Textfield from './src/components/Textfield.jsx';
<<<<<<< 85cd861f2e5f39f82150f87e38cf9e9b0a076235:client/main.js
*/
console.log('main.js file recognized');
=======
>>>>>>> implemented browserify:client/main.jsx

function main() {
  return;
}

<<<<<<< 85cd861f2e5f39f82150f87e38cf9e9b0a076235:client/main.js
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

=======
const element = (
  <div>
  <h1>
    REACT
  </h1>
  <nav>LUXURY NAV</nav>
  <Grid />
  <Gameinfo />
  <Textfield />
  </div>
);

console.log(element);

>>>>>>> implemented browserify:client/main.jsx
ReactDOM.render(
  element,
  document.getElementById('main')
);