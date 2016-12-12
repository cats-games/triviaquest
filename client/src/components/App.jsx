'use strict';

import React from 'react';
import Gameinfo from './Gameinfo.jsx';
import Textfield from './Textfield.jsx';
import Grid from './Grid.jsx';
import AppBar from 'material-ui/AppBar';
import FlatButton from 'material-ui/FlatButton';
import IconButton from 'material-ui/IconButton';
import PlayerStatus from './PlayerStatus.jsx'


// App should:
// Grab challenges from server
// Keep score
// Keep track of player position
// Generate a random board (spaces)
// Check for correct/incorrect answers
// Update game based on images
class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      // Objects with and ID, an optional challenge, and optional "image".
      grid: {},
      player: {
        health: 100,
      },
      // Score object to track challenges attempted, succeeded, and failed, so we can show stats.
      score: {
        attempted: 0,
        success: 0,
        fail: 0
      },
      rules: { // Change these before running the game. DO NOT change these during the game.
        numSpaces: 100, // Number of spaces on the gameboard
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
    var _grid = this.state.grid;
    window.gameAppConnector = new GameAppConnector(this);
    this.game = window.game;
    // Everything is by default.
    for (let i = 1; i <= this.state.rules.numSpaces; i++) {
      _grid[i] = {
        id: i,
        image: 'water'
      };
    }

    this.setState((prevState) => {
      return {
        grid: _grid
      }
    });
  }

  componentDidMount() {
    this.game.renderer.draw();
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

    // If a there is a challenge on this position
    if (this.state.currentChallenge) {
      var correct = false;
      // Check if the user input and the solution match up
      if (input === this.state.currentChallenge.answer) {
        correct = true;
      }
      this.updateScore(correct);
    }
  }

  updateScore(correct) {
    // Regardless of whether the user's answer was correct,
    // +1 to the number of attempted questions

    if (correct) {
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
        // Decrement the user's health
        window.gameAppConnector.decrementPlayerHealth(20)
        return {
          score: {
            attempted: prevState.score.attempted += 1,
            success: prevState.score.success, // No change
            fail: prevState.score.fail += 1
          }
        };
      });
    }
  }


  render() {
    // **These are to be used as references only, do not mutate them**
    var _grid = this.state.grid;
    var _health = this.state.player.health;
    var toRender;
    var gameInfoText = "";

    if (true || Object.keys(_grid).length === this.state.rules.numSpaces) {
      // If there is a challenge, display the challenge prompt
      if (this.state.currentChallenge) {
        gameInfoText = this.state.currentChallenge.prompt;
      }
      // Render the gameboard, gameinfo, and text input field
      toRender = (
        <div id="app">
          <AppBar
            title="It's a Game!"
            showMenuIconButton={false}
            iconElementRight={<FlatButton label="Login" />}
          />
          <div className="game-display">
            <PlayerStatus health={_health} />
            <Grid grid={_grid} />
            <Gameinfo gameInfoText={gameInfoText}/>
            <Textfield checkAnswer={this.checkAnswer.bind(this)}/>
          </div>
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
