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
      grid: {},
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
      rules: { // Change these before running the game. DO NOT change these during the game.
        numSpaces: 25, // Number of spaces on the gameboard
        health: 100, // Health points to start the player with
        damage: 20, // Health points to lose per incorrect answer
        heal: 20, // Health points to gain per potion
        tiles: [ // Things that can be generated on the gameboard
          // Probabilities on a 1 to 100 scale. Please make them add up to 100.
          {
            type: 'enemy', // A challenge
            probability: 70
          },
          {
            type: 'potion',
            probability: 10,
          },
          {
            type: 'grass',
            probability: 20
          }
        ]
      }
    };
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
    var grid = {};
    // **These are to be used as references only, do not mutate them**
    var _rules = this.state.rules;
    var _player = this.state.player;

    // Sort the tiles from highest to lowest probability
    var tiles = this.sortByProbability(_rules.tiles);
    // For each space on the gameboard
    for (var i = 1; i <= _rules.numSpaces; i++) {
      // If the player is on this space, continue to populate the next spaces
      if (_player.position === i) {
        grid[i] = {
          id: i,
          item: 'grass'
        };
        continue; // i++ and continue to the next iteration of this for loop
      }

      /*
        EXAMPLE:
        [{ type: 'enemy', probability: 70 }, { type: 'grass', probability: 30 }]
        random = 10; comparison = 70; random <= comparison, so generate an enemy.

        random = 90; comparison = 70; random !<= comparison. Next.
        random = 90; comparison = 70 + 30 = 100; random <= comparison, so generate grass.
      */
      var comparison = 0;
      // If the player isn't on this space:
      // Pseudorandomly decide what to put on this space
      // This is a number from 1 to 100
      var random = Math.floor(Math.random() * 100) + 1;
      for (var j = 0; j < tiles.length; j++) {

        comparison += tiles[j].probability;
        if (random <= comparison) {
          // Populate it with this tile
          if (tiles[j].type === 'enemy') { // Populate with a challenge
            grid[i] = {
              id: i,
              challenge: this.state.challenges[challengeNum++]
            };
          } else {
            grid[i] = { // Populate with an item
              id: i,
              item: tiles[j].type
            };
          }
          break; // Break out of this for loop.
          // i++ and continue to the next iteration of the outer for loop.
        }
      }
    }
    // Update the state with the newly populated gameboard
    this.setState({
      grid: grid
    });
  }


  ///////////////
  // LISTENERS //
  ///////////////

  // Keep track of player movement
  handleKeyDown(e) {
    // **These are to be used as references only, do not mutate them**
    var _player = this.state.player;
    var _grid = this.state.grid;

    // The space the player is currently on
    var currentSpace = _grid[_player.position];

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

    if (e.which === 72 || e.which === 37 || e.which === 65) {
      // h, a, left-arrow / move left
      if ((this.state.playerPosition - 1) % rows !== 0) {
        this.setPositions(-1);
      }
    } else if (e.which === 74 || e.which === 83 || e.which === 40) {
      // j, s, down-arrow / move down
      if (this.state.playerPosition <= rows * (rows - 1)) {
        this.setPositions(rows);
      }
    } else if (e.which === 75 || e.which === 87 || e.which === 38) {
      // k, w, up-arrow / move up
      if (this.state.playerPosition > rows) {
        this.setPositions(-rows);
      }
    } else if (e.which === 76 || e.which === 68 || e.which === 39) {
      // l, d, right-arrow/ move right
      if (this.state.playerPosition % rows !== 0) {
        this.setPositions(1);
      }
    }
  }

  // Check answer
  checkAnswer(e, input) {
    // **These are to be used as references only, do not mutate them**
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
  updatePlayerAndScores(correct) {
    // **These are to be used as references only, do not mutate them**
    var _player = this.state.player;
    var _grid = this.state.grid;

    // Regardless of whether the user's answer was correct,
    // +1 to the number of attempted questions

    if (correct) {
      // Remove the challenge from the gameboard space the user is on
      this.removeFromSpace(_grid[_player.position], 'challenge');

      // If the user's answer is correct, +1 to the number of successes
      this.setState((prevState, props) => {
        return {
          score: {
            attempted: prevState.score.attempted += 1,
            success: prevState.score.success += 1,
            fail: prevState.score.fail // No change
          }
        };
      });
    } else {
      // If the user's answer was incorrect, +1 to the number of fails
      // Decrement the user's health
      this.setState((prevState, props) => {
        return {
          player: {
            position: prevState.player.previousPosition, // Push back
            previousPosition: prevState.player.previousPosition,
            health: prevState.player.health - this.state.rules.damage
          },
          score: {
            attempted: prevState.score.attempted += 1,
            success: prevState.score.success, // No change
            fail: prevState.score.fail += 1
          }
        };
      });
    }
  }

  /////////////
  // HELPERS //
  /////////////

  // Remove the property 'toRemove' from the given board space object
  removeFromSpace(space, toRemove) {
    delete space[toRemove];
    // Put grass on this space
    space.item = 'grass';
  }

  // Update the game accordingly depending on the item found on this space
  handleItem(space) {
    var _player = this.state.player;
    var _rules = this.state.rules;

    if (space.item) {
      if (space.item === 'potion') {
        var health = _player.health + _rules.heal;
        health = health > _rules.health ? _rules.health : health; // Player's health can't go over the starting health

        this.setState((prevState, props) => {
          return {
            player: {
              position: prevState.player.position,
              previousPosition: prevState.player.previousPosition,
              health: health
            }
          };
        });
      }
      // and other possibilities in future iterations

      // After using the item, remove it from the space
      this.removeFromSpace(space, 'item');
    }
  }

  // Move the player moves number of spaces
  setPositions(moves) {
    this.setState((prevState, props) => {
      return {
        player: {
          position: prevState.player.position + moves,
          previousPosition: prevState.player.position,
          health: prevState.player.health // No change
        }
      };
    });
  }

  // Sorts an array of objects from highest to lowest probability
  sortByProbability(array) {
    return _.sortBy(array, function(object) {
      return -object.probability;
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
    // **These are to be used as references only, do not mutate them**
    var _grid = this.state.grid;
    var _player = this.state.player;

    var toRender;

    if (Object.keys(_grid).length === this.state.rules.numSpaces) {
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
