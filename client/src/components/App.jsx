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
      playerPosition: 1, // Initialize player position
      previousPosition: 1,
      grid: {}
    };

    this.numSpaces = 25;
    // !Don't run functions in the constructor!
    // !Run them in componentWillMount instead!
  }

  ////////////////////
  // INITIALIZATION //
  ////////////////////

  componentWillMount() {
    // Get challenges from API and update state
    this.getChallenges();
    // Initialize the gameboard
    this.initializeBoard();
  }

  // Get challenges from API and update state
  getChallenges() {
    $.get('/api/challenges')
      .done(challenges => { // An array of challenge objects
        // Shuffle the challenges
        challenges = this.shuffle(challenges);
        // Save the challenges to the state
        this.setState({
          challenges: challenges
        });
      })
      .fail(function(error) {
        console.error('Could not get challenges:', error);
      });
  }

  // Initialize an empty gameboard
  initializeBoard() {
    var grid = {};
    for (var i = 1; i <= this.numSpaces; i++) {
      grid[i] = {
        id: i,
        challenge: undefined
      };
    }

    this.setState({
      grid: grid
    });
  }

  // Populate the board with enemies or grass
  populateBoard() {
    // Index of challenge in this.state.challenges
    var challengeNum = 0;

    // For each space on the gameboard
    for (var i = 1; i <= this.numSpaces; i++) {
      // If the player is not on this space
      if (this.state.playerPosition !== i) {
        // Pseudorandomly decide if there will be an enemy or grass
        var random = Math.floor(Math.random() * 2) + 1;
        if (random === 1) {
          // There will be an enemy (challenge) on this space

          // Update the state grid with a challenge on this space
          this.updateGridState({
            id: i,
            challenge: this.state.challenges[challengeNum++]
          }, i);

        }
        // Else, there is grass on this space
      }
    }
  }

  // Helper to shuffle an array's contents
  shuffle(array) {
    for (var i = array.length - 1; i > 0; i--) { 
      var j = Math.floor(Math.random() * (i + 1)); 
      var temp = array[i]; 
      array[i] = array[j]; 
      array[j] = temp; 
    } 
    return array;
  }

  // Update the state's grid property with the given object at the given id
  updateGridState(object, gridId) {
    // Make a copy of the grid
    var updatedGrid = this.state.grid;

    // Insert the object to update the grid
    updatedGrid[gridId] = object;

    // Set the state with the updated grid
    this.setState({
      grid: updatedGrid
    });
  }

  ///////////////
  // LISTENERS //
  ///////////////



  render() {
    var toRender;
    if (Object.keys(this.state.grid).length > 0) {
      toRender = (<Grid grid={this.state.grid} playerPosition={this.state.playerPosition}/>);
    } else {
      toRender = (<div id="loading">Loading . . . </div>);
    }
    return toRender;
  }
}

export default App;
