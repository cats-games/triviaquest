'use strict';

import React from 'react';
import Gameinfo from './Gameinfo.jsx';
import Textfield from './Textfield.jsx';
import GridSpace from './GridSpace.jsx';

// Grid should:
// Render grid spaces
// Listen for player movement and update position
class Grid extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    var gridNumber = 0;
    return (
      <div id="grid" onKeyDown={this.setplayerPosition}>
      {Object.keys(this.props.grid).map(() => {
          gridNumber++; // To start the gridNumber at 1

          // If the player is on the current grid space
          var player = this.props.playerPosition === gridNumber;
          // If there is an enemy on this current grid space
          var enemy = this.props.grid[gridNumber].challenge;

          // The type of grid space to render
          var type;
          if (player && enemy) {
            type = 'fight';
          } else if (player) {
            type = 'player';
          } else if (enemy) {
            type = 'enemy'
          } else {
            type = 'grass'
          }

          return (<GridSpace type={type} id={gridNumber}/>);
        })
      }
    </div>
    );
  }
}

export default Grid;
