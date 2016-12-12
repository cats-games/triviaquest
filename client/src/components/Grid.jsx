'use strict';

import React from 'react';
import Gameinfo from './Gameinfo.jsx';
import Textfield from './Textfield.jsx';
import GridSpace from './GridSpace.jsx';

var Grid = ({grid, playerPosition}) => {
  var gridNumber = 0;

  return (
    <div id="grid">
      {Object.keys(grid).map(() => {
          gridNumber++; // To start the gridNumber at 1

          // If the player is on the current grid space
          var player = playerPosition === gridNumber;
          // The type of object to render on the grid space
          var image = grid[gridNumber].image;

          return (<GridSpace type={player || image} id={'space-' + gridNumber}/>);
        })
      }
    </div>
  );
}

export default Grid;
