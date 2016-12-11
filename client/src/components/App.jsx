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
    this.getChallenges(this.populateBoard.bind(this));
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
      if (this.state.playerPosition !== i) {
        // Pseudorandomly decide if there will be an enemy or grass
        var random = Math.floor(Math.random() * 2) + 1;
        if (random === 1) {
          // There will be an enemy (challenge) on this space
          updatedGrid[i] = {
            id: i,
            challenge: this.state.challenges[challengeNum++]
          };
        } else {
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

    this.setState({
      grid: updatedGrid
    });

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

  ///////////////
  // LISTENERS //
  ///////////////



  render() {
    var toRender;
    if (Object.keys(this.state.grid).length === this.numSpaces) {
      toRender = (<Grid grid={this.state.grid} playerPosition={this.state.playerPosition}/>);
    } else {
      toRender = (<div id="loading">Loading . . . </div>);
    }
    return toRender;
  }
}

export default App;
