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
// Update game based on items
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
    this.maxNumPotions = 1; // Health potions to generate on the gameboard
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

  // Populate the board with enemies, items, and grass
  populateBoard() {
    // Index of challenge in this.state.challenges
    var challengeNum = 0;
    var updatedGrid = {};

    // For each space on the gameboard
    for (var i = 1; i <= this.numSpaces; i++) {
      // If the player is not on this space
      if (this.state.player.position !== i) {
        // ----- TODO: Can this be improved? -----
        // ^ Or can probabilities be set as properties on 'this' in the constructor?
        // Pseudorandomly decide if there will be an enemy or grass
        var random = Math.floor(Math.random() * 10) + 1;
        if (random <= 6) {
          // There will be an enemy (challenge) on this space
          updatedGrid[i] = {
            id: i,
            challenge: this.state.challenges[challengeNum++]
          };
        } else if (random === 7 && this.numPotions) {
          updatedGrid[i] = {
            id: 1,
            challenge: undefined,
            item: 'potion'
          }
          this.numPotions--;
        } else {
          // ----- TODO: Can this be rewritten so that it doesn't repeat twice? -----
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
    var _player = this.state.player;
    var _grid = this.state.grid;

    // The space the player is currently on
    var currentSpace = _grid[_player.position]

    // ----- Player is not allowed to move -----
    // If the current space contains a challenge, don't allow the player to move
    if(currentSpace.challenge){
      return;
    }

    // If the player is typing in the input box, don't allow the player to move
    if (e.target === document.getElementById('answer')) {
      return;
    }

    // ----- Player is allowed to move in all other cases -----
    // Check if there are items on this space and act accordingly
    this.handleItem(currentSpace);

    // Move the player
    var rows = Math.sqrt(this.numSpaces);
    if (e.which === 72) {
      // h / move left
      if ((_player.position - 1) % rows !== 0) {
        this.setPositions(-1);
      }
    } else if (e.which === 74) {
      // j / move down
      if (_player.position <= rows * (rows - 1)) {
        this.setPositions(rows);
      }
    } else if (e.which === 75) {
      // k / move up
      if (_player.position > rows) {
        this.setPositions(-rows);
      }
    } else if (e.which === 76) {
      // l/ move right
      if (_player.position % rows !== 0) {
        this.setPositions(1);
      }
    }
  }

  // Check answer
  checkAnswer(e, input) {
    var _player = this.state.player;
    var _grid = this.state.grid;

    // Prevent the page from refreshing
    e.preventDefault();
    // Clear the input field
    $('#answer').val('');

    // Get the challenge at the current player position
    var currentChallenge = _grid[_player.position].challenge;

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

  // Update player and score properties
  updatePlayerAndScores(correct, remove) {
    var _player = this.state.player;
    var _score = this.state.score;
    // Update the score
    _score['attempted']++;

    if (correct) {
      // --------------------------------------------
      // Needed so the gameboard will re-render when removing an enemy/challenge
      // ----- TODO: Possible area for refactoring -----

      // Make a copy of the spaces object
      var _grid = this.state.grid;
      // Make a copy of the current space object (singular)
      var currentSpace = this.state.grid[_player.position];
      // Remove the challenge from the current position
      // NOTE: On re-render, no enemy should appear at this position

      // Remove the challenge from the current space
      this.removeFromSpace(currentSpace, 'challenge');

      // Place the updated space back into the spaces object
      _grid[_player.position] = currentSpace;

      // Update the success score
      _score['success']++;

      // Set the state with the updated spaces object
      this.setState({
        grid: _grid,
        score: _score
      });

      // --------------------------------------------
    } else {

      // Update the failure score
      _score['fail']++;

      // Push the play back to the previous position
      this.setState({
        player: {
          position: _player.previousPosition,
          previousPosition: _player.previousPosition,
          health: _player.health - this.damage
        },
        score: _score
      });
    }
  }

  /////////////
  // HELPERS //
  /////////////

  // Remove the property 'toRemove' from the given grid space object
  removeFromSpace(space, toRemove) {
    delete space[toRemove];
  }

  // Update the game accordingly depending on the item found on this space
  handleItem(space) {
    var _player = this.state.player;

    if (space.item){
      if (space.item === 'potion') {
        _player.health += 20;
      }
      // and other possibilities in future iterations

      // After using the item, remove it from the space
      this.removeFromSpace(space, 'item');
    }

  }

  // Move the player moves number of spaces
  setPositions(moves) {
    var _player = this.state.player;

    this.setState({
      player: {
        previousPosition: _player.position,
        position: _player.position + moves,
        health: _player.health // No change
      }
    });
  }

  // Shuffle an array's contents
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
    var _grid = this.state.grid;
    var _player = this.state.player;
    var toRender;

    if (Object.keys(_grid).length === this.numSpaces) {
      // If there is a challenge, display the challenge prompt
      var gameInfoText = '';
      var currentPlayerSpace = _grid[_player.position];
      var currentChallenge = currentPlayerSpace.challenge;
      if (currentChallenge){
        gameInfoText = currentChallenge.prompt;
      }
      // Render the gameboard, gameinfo, and text input field
      toRender = (
        <div id="app">
          <Grid grid={_grid} playerPosition={_player.position}/>
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
