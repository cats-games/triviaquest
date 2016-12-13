'use strict';

import React from 'react';
import Gameinfo from './Gameinfo.jsx';
import Textfield from './Textfield.jsx';
import Grid from './Grid.jsx';
import AppBar from 'material-ui/AppBar';
import Avatar from 'material-ui/Avatar';
import FlatButton from 'material-ui/FlatButton';
import IconButton from 'material-ui/IconButton';
import PlayerStatus from './PlayerStatus.jsx';
import GameOver from './GameOver.jsx';


// App should:
// Check player's answers to challenges
// Keep score
// Render on the browser a certain number of grid spaces
class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      // Objects with and ID, an optional challenge, and optional "image".
      grid: {},
      player: {
        health: 100, //TODO: Can this be a property on the player entity in in rogue?
      },
      // Score object to track challenges attempted, succeeded, and failed, so we can show stats.
      score: {
        attempted: 0,
        success: 0,
        fail: 0
      },
      rules: { // Change these before running the game. DO NOT change these during the game.
        numSpaces: 100, // Number of spaces on the gameboard
        //TODO: Can probably just use this.state.numSpaces instead of the rules object
      }
    };
  }

  ////////////////////
  // INITIALIZATION //
  ////////////////////

  componentWillMount() {
    // See https://davidwalsh.name/react-authentication
    this.createLock();
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
        grid: _grid,
      }
    });
    this.idToken = this.getIdToken();
    this.setProfile();
  }

  createLock() {
    this.lock = new Auth0Lock('rpA1ER3Q4mTCdhol9P1h1lPF2vhaTOAL', 'stefanr.auth0.com');
  }

  setProfile() {
    this.lock.getProfile(this.idToken, function (err, profile) {
      if (err) {
        console.log("Error loading the Profile", err);
        return;
      }
      this.setState({profile: profile});
      console.log({profile});
    }.bind(this));
  }

  componentDidMount() {
    this.game.renderer.draw();

  }

  // Check answer
  checkAnswer(e, input) {
    // Prevent the page from refreshing
    e.preventDefault();
    // Clear the input field
    $('#answer').val('');

    if (this.state.currentEnemy) {
      if (input === this.state.currentEnemy.challenge.answer) {
        // Kill the enemy
        this.state.currentEnemy.dead = true;
        // Remove the enemy from the grid
        this.game.entityManager.remove(this.state.currentEnemy);

        // Increase the player's score

        // Remove the enemy from the state
        this.setState({
          currentEnemy: undefined
        });
      }
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

  getIdToken() {
    // First, check if there is already a JWT in local storage
    var idToken = localStorage.getItem('id_token');
    var authHash = this.lock.parseHash(window.location.hash);
    // If there is no JWT in local storage and there is one in the URL hash,
    // save it in local storage
    if (!idToken && authHash) {
      if (authHash.id_token) {
        idToken = authHash.id_token
        localStorage.setItem('id_token', authHash.id_token);
      }
      if (authHash.error) {
        // Handle any error conditions
        console.log("Error signing in", authHash);
      }
    }
    return idToken;
  }

  render() {
    // **These are to be used as references only, do not mutate them**
    var _grid = this.state.grid;
    var _health = this.state.player.health;
    var toRender;
    var gameInfoText = "";

    // Show login screen if user is not yet logged in.
    if (!this.idToken) {
      this.lock.show();
    };


    // If there is a challenge, display the challenge prompt
    if (this.state.currentEnemy) {
      gameInfoText = this.state.currentEnemy.challenge.prompt;
      // Render the gameboard, gameinfo, and text input field
      toRender = (
        <div id="app">
        <AppBar
          title="It's a Game!"
          showMenuIconButton={false}
          iconElementRight={<div className="right-icon"><span className="github-name">{this.state.profile ? this.state.profile.name : ''}</span><Avatar src={this.state.profile ? this.state.profile.picture : ''} size={35} backgroundColor='rgba(0,0,0,0)' /></div>}
        />
          <div className="game-display">
            <PlayerStatus health={_health} />
            <Grid grid={_grid} />
            <Gameinfo gameInfoText={gameInfoText}/>
            <Textfield checkAnswer={this.checkAnswer.bind(this)}/>
            <GameOver actions={this.actions} health={this.state.player.health}/>
          </div>
        </div>
      );
    } else {
      // If the gameboard is not ready, display a loading statement
      toRender = (<div id="loading">Loading . . . </div>);
    }
  }
}

export default App;
