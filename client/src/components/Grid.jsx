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

    console.log(props.grid);
  }

  componentWillMount() {
    // Check for navigation keys
    window.addEventListener('keydown', this.handleKeyDown.bind(this));
  }

  componentWillUnmount() {
    window.removeEventListener('keydown', this.handleKeyDown.bind(this));
  }

  handleKeyDown(e) {

    var currentChallenge = this.state.spaces[this.state.playerPosition].challenge;

    // Player is not allowed to move
    //checks if the current space contains a challenge and exits function if true
    if(currentChallenge){
      return;
    }
    // If the player is typing in the input box, don't make them move on the grid
    if (e.target === document.getElementById('answer')) {
      return;
    }

    // Player is allowed to move
    var rows = Math.sqrt(this.numSpaces);
    var setPositions = function(difference){
      this.setState({
        previousPosition: this.state.playerPosition,
        playerPosition: this.state.playerPosition + difference
      });
    }.bind(this);

    if (e.which === 72) {
      // h / move left
      if ((this.state.playerPosition - 1) % rows !== 0) {
        setPositions(-1);
        // this.setState({playerPosition: this.state.playerPosition - 1});
      }
    } else if (e.which === 74) {
      // j / move down
      if (this.state.playerPosition <= rows * (rows - 1)) {
        setPositions(rows);
        // this.setState({playerPosition: this.state.playerPosition + rows});
      }
    } else if (e.which === 75) {
      // k / move up
      if (this.state.playerPosition > rows) {
        setPositions(-rows);
        // this.setState({playerPosition: this.state.playerPosition - rows});
      }
    } else if (e.which === 76) {
      // l/ move right
      if (this.state.playerPosition % rows !== 0) {
        setPositions(1);
        // this.setState({playerPosition: this.state.playerPosition + 1});
      }
    }
  }

  checkAnswer(e, input) {
    // Prevent the page from refreshing
    e.preventDefault();
    // Clear the input field
    $('#answer').val('');

    // Get the challenge at the current player position
    var currentChallenge = this.state.spaces[this.state.playerPosition].challenge;

    // If a there is a challenge on this position
    if (currentChallenge) {
      // Check if the user input and the solution match up
      if (input === currentChallenge.answer) { // If the answer is correct
        this.setState({ // Increment the score
          score: this.state.score + 1
        }); // For future humans: this is asynchronous

        // Make a copy of the spaces object
        var updatedSpaces = this.state.spaces;
        // Make a copy of the current space object (singular)
        var updatedCurrentSpace = this.state.spaces[this.state.playerPosition];
        // Remove the challenge from the current position
        // NOTE: On re-render, no enemy should appear at this position
        updatedCurrentSpace.challenge = undefined;
        updatedCurrentSpace.hasEnemy = false;
        // Place the updated space back into the spaces object
        updatedSpaces[this.state.playerPosition] = updatedCurrentSpace;

        // Set the state with the updated spaces object
        this.setState({
          spaces: updatedSpaces
        });

      } else {
        // Push the play back to the previous position
        this.setState({
          playerPosition: this.state.previousPosition
        });
      }
    }

  }

  render() {
    var question = '';
    var spaces = this.props.grid;
    var position = this.props.playerPosition;

    if (spaces[position].challenge) {
      question = spaces[position].challenge.prompt;
    }

    var gridNumber = 0;
    return (
      <div>
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
      <Gameinfo cats={question}/>
      <Textfield checkAnswer={this.checkAnswer.bind(this)}/>
    </div>
    );
  }
}

export default Grid;
