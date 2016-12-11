'use strict';

import React from 'react';
import Gameinfo from './Gameinfo.jsx';
import Textfield from './Textfield.jsx';

class Grid extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      spaces: {},
      challenges: this.props.challenges,
      score: 0
    };

    this.numSpaces = 25;
  }

  componentWillMount() {
    // Initialize player position
    this.setState({
      playerPosition: 1,
      previousPosition: 1
    });
    // Check for navigation keys
    window.addEventListener('keydown', this.handleKeyDown.bind(this));

    // Initialize the spaces of the board
    this.initializeBoard();
    // Populate the board with enemies/challenges
    var challenges = this.state.challenges.slice();
    this.populateEnemiesAndChallenges(challenges);
  }

  // componentWillUpdate(nextProps, nextState) {
  //   // Check if challenges exist
  //   if (this.state.challenges.length === 0 && nextState.challenges.length) {
  //     var challenges = this.state.challenges.slice();
  //     this.populateEnemiesAndChallenges(challenges);
  //   }
  // }

  // Initialize board spaces with an ID number and no enemies
  initializeBoard() {
    for (var i = 1; i <= this.numSpaces; i++) {
      this.state.spaces[i] = {
        id: i,
        challenge: undefined,
        hasEnemy: false
      };
    }
  }

  populateEnemiesAndChallenges(challenges) {
    // Populate the spaces with enemies
    var enemySquares = this.generateEnemySquares();

    enemySquares.forEach(function(enemy) {
      var challenge = challenges.pop();
      if (challenge) {
        // Add a challenge to this space
        this.state.spaces[enemy]['challenge'] = challenge;
        this.state.spaces[enemy]['hasEnemy'] = true;
      }
    }.bind(this));
  }

  // Generates an array of shuffled enemy positions
  generateEnemySquares() {
    var enemySquares = _.range(1, this.numSpaces + 1);
    // Skip the position that the player is on
    enemySquares.splice(this.state.playerPosition - 1, 1);

    this.shuffle(enemySquares);

    return enemySquares;
  }

  shuffle(array) {
    for (var i = array.length - 1; i > 0; i--) { 
      var j = Math.floor(Math.random() * (i + 1)); 
      var temp = array[i]; 
      array[i] = array[j]; 
      array[j] = temp; 
    } 
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
    var spaces = this.state.spaces;
    var position = this.state.playerPosition;

    if (spaces[position].challenge) {
      question = spaces[position].challenge.prompt;
    }

    var gridNumber = 0;
    return (
      <div>
        <div id="grid" onKeyDown={this.setplayerPosition}>
        {Object.keys(this.state.spaces).map(() => {
            gridNumber++;
            var activated = this.state.playerPosition === (gridNumber) ? "activated " : "";
            var enemy = this.state.spaces[gridNumber].hasEnemy ? "enemy" : "";
            return (<div className={"gridbox " + activated + enemy} id={gridNumber}>{gridNumber}</div>);
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
