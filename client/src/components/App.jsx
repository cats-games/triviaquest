'use strict';

import React from 'react';
import Gameinfo from './Gameinfo.jsx';
import Textfield from './Textfield.jsx';
import Grid from './Grid.jsx';

// App should:
// Grab challenges from server
// Keep score
// Keep track of player position
// Generate a random board (spaces)
// Check for correct/incorrect answers
class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      challenges: [],
      score: {
        attempted: 0,
        success: 0,
        fail: 0
      },
      player: {
        position: 1,
        previousPosition: 1,
        health: 100
      },
      grid: {}
    };

    this.numSpaces = 25; // Number of spaces on the gameboard
    this.damage = 20; // Health points to lose per incorrect answer
    // !Don't run functions in the constructor!
    // !Run them in componentWillMount instead!
  }

  ////////////////////
  // INITIALIZATION //
  ////////////////////

  componentWillMount() {
    // Get challenges from API and update state
    this.getChallenges(this.populateBoard.bind(this));

    // Listen for keypresses (to move player when necessary)
    window.addEventListener('keydown', this.handleKeyDown.bind(this));
  }

  componentWillUnmount() {
    // Stop listening for key presses
    window.removeEventListener('keydown', this.handleKeyDown.bind(this));
  }

  // Get challenges from API and update state
  getChallenges(callback) {
    $.get('/api/challenges')
      .done(challenges => { // An array of challenge objects
        // Shuffle the challenges
        challenges = this.shuffle(challenges);
        // Save the challenges to the state
        this.setState({
          challenges: challenges
        }, function() {
          callback();
        });
      })
      .fail(function(error) {
        console.error('Could not get challenges:', error);
      });
  }

  // Populate the board with enemies or grass
  populateBoard() {
    // Index of challenge in this.state.challenges
    var challengeNum = 0;
    var updatedGrid = {};

    // For each space on the gameboard
    for (var i = 1; i <= this.numSpaces; i++) {
      // If the player is not on this space
      if (this.state.player.position !== i) {
        // Pseudorandomly decide if there will be an enemy or grass
        var random = Math.floor(Math.random() * 2) + 1;
        if (random === 1) {
          // There will be an enemy (challenge) on this space
          updatedGrid[i] = {
            id: i,
            challenge: this.state.challenges[challengeNum++]
          };
        } else {
          // TODO: Can this be rewritten so that it doesn't repeat twice?
          // Else, there is grass on this space
          updatedGrid[i] = {
            id: i,
            challenge: undefined
          }
        }
      } else {
        // Else, there is grass on this space
        updatedGrid[i] = {
          id: i,
          challenge: undefined
        }
      }
    }
    // Update the state with the gameboard
    this.setState({
      grid: updatedGrid
    });

  }


  ///////////////
  // LISTENERS //
  ///////////////

  // Keep track of player movement
  handleKeyDown(e) {

    // A challenge object, or undefined
    var currentChallenge = this.state.grid[this.state.player.position].challenge;

    // Player is not allowed to move
    // If the current space contains a challenge, don't allow the player to move
    if(currentChallenge){
      return;
    }

    // If the player is typing in the input box, don't allow the player to move
    if (e.target === document.getElementById('answer')) {
      return;
    }

    // Player is allowed to move in all other cases
    var rows = Math.sqrt(this.numSpaces);
    console.log('Player:', this.state.player);
    console.log('Score:', this.state.score);
    if (e.which === 72) {
      // h / move left
      if ((this.state.player.position - 1) % rows !== 0) {
        this.setPositions(-1);
      }
    } else if (e.which === 74) {
      // j / move down
      if (this.state.player.position <= rows * (rows - 1)) {
        this.setPositions(rows);
      }
    } else if (e.which === 75) {
      // k / move up
      if (this.state.player.position > rows) {
        this.setPositions(-rows);
      }
    } else if (e.which === 76) {
      // l/ move right
      if (this.state.player.position % rows !== 0) {
        this.setPositions(1);
      }
    }
  }

  // Move the player moves number of spaces
  setPositions(moves) {
    this.setState({
      player: {
        previousPosition: this.state.player.position,
        position: this.state.player.position + moves,
        health: this.state.player.health // No change
      }
    });
  }

  // Check answer
  checkAnswer(e, input) {
    // Prevent the page from refreshing
    e.preventDefault();
    // Clear the input field
    $('#answer').val('');

    // Get the challenge at the current player position
    var currentChallenge = this.state.grid[this.state.player.position].challenge;

    // If a there is a challenge on this position
    if (currentChallenge) {
      var correct = false;
      // Check if the user input and the solution match up
      if (input === currentChallenge.answer) {
        correct = true;
      }
      // Update player stats based on the correct/incorrect answer
      this.updatePlayerAndScores(correct);
    }
  }

  updatePlayerAndScores(correct) {
    // Update the score
    var updatedScore = this.state.score;
    updatedScore['attempted']++;

    if (correct) {
      // --------------------------------------------
      // Needed so the gameboard will re-render when removing an enemy/challenge

      // Make a copy of the spaces object
      var updatedSpaces = this.state.grid;
      // Make a copy of the current space object (singular)
      var updatedCurrentSpace = this.state.grid[this.state.player.position];
      // Remove the challenge from the current position
      // NOTE: On re-render, no enemy should appear at this position
      updatedCurrentSpace.challenge = undefined;
      // Place the updated space back into the spaces object
      updatedSpaces[this.state.player.position] = updatedCurrentSpace;

      // Update the success score
      updatedScore['success']++;

      // Set the state with the updated spaces object
      this.setState({
        grid: updatedSpaces,
        score: updatedScore
      });

      // --------------------------------------------
    } else {

      // Update the failure score
      updatedScore['fail']++;

      // Push the play back to the previous position
      this.setState({
        player: {
          position: this.state.player.previousPosition,
          previousPosition: this.state.player.previousPosition,
          health: this.state.player.health - this.damage
        },
        score: updatedScore
      });
    }
  }

  /////////////
  // HELPERS //
  /////////////

  // Helper to shuffle an array's contents
  // Used to shuffle the order of challenges received from the server
  shuffle(array) {
    for (var i = array.length - 1; i > 0; i--) { 
      var j = Math.floor(Math.random() * (i + 1)); 
      var temp = array[i]; 
      array[i] = array[j]; 
      array[j] = temp; 
    } 
    return array;
  }

  render() {
    var toRender;

    if (Object.keys(this.state.grid).length === this.numSpaces) {
      // If there is a challenge, display the challenge prompt
      var gameInfoText = '';
      var currentPlayerSpace = this.state.grid[this.state.player.position];
      var currentChallenge = currentPlayerSpace.challenge;
      if (currentChallenge){
        gameInfoText = currentChallenge.prompt;
      }
      // Render the gameboard, gameinfo, and text input field
      toRender = (
        <div id="app">
          <Grid grid={this.state.grid} playerPosition={this.state.player.position}/>
          <Gameinfo gameInfoText={gameInfoText}/>
          <Textfield checkAnswer={this.checkAnswer.bind(this)}/>
        </div>
      );
    } else {
      // If the gameboard is not ready, display a loading statement
      toRender = (<div id="loading">Loading . . . </div>);
    }
    return toRender;
  }
}

export default App;
