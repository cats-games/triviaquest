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
          // If there is an enemy on this current grid space
          var enemy = grid[gridNumber].challenge;
          var item = grid[gridNumber].item;

          // The type of grid space to render
          var type;
          if (player && enemy) {
            type = 'fight';
          } else if (player) {
            type = 'player';
          } else if (enemy) {
            type = 'enemy';
          } else if (item) {
            type = item;
          }
          return (<GridSpace type={type} id={'space-' + gridNumber}/>);
        })
      }
    </div>
  );
}

export default Grid;
