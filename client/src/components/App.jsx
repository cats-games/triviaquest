'use strict';

import React from 'react';
import Gameinfo from './Gameinfo.jsx';
import Textfield from './Textfield.jsx';
import Grid from './Grid.jsx';
import PlayerStatus from './PlayerStatus.jsx'

//Material UI components
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import darkBaseTheme from 'material-ui/styles/baseThemes/darkBaseTheme';
import lightBaseTheme from 'material-ui/styles/baseThemes/lightBaseTheme';
import injectTapEventPlugin from 'react-tap-event-plugin';
injectTapEventPlugin();
import {
  blue300,
  blue500,
  cyan500, 
  cyan700,
  pinkA200,
  grey100, 
  grey300,
  grey400,
  grey500,
  grey700,
  grey800, 
  grey900,
  white, 
  darkBlack, 
  fullBlack
} from 'material-ui/styles/colors';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import {fade} from 'material-ui/utils/colorManipulator';
import Drawer from 'material-ui/Drawer';
import MenuItem from 'material-ui/MenuItem';
import NavigationClose from 'material-ui/svg-icons/navigation/close';
import AppBar from 'material-ui/AppBar';
import FlatButton from 'material-ui/FlatButton';
import IconButton from 'material-ui/IconButton';
import Paper from 'material-ui/Paper';
import Card from 'material-ui/Card';
import Themes from './Themes.js'

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
      },
      //state of sliding side menu
      drawerOpen: false
      theme: Themes.dark
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

  handleDrawerToggle(){
    console.log(this.state);
    this.setState({drawerOpen: !this.state.drawerOpen});
  } 


  render() {
    // **These are to be used as references only, do not mutate them**
    var _grid = this.state.grid;
    var _health = this.state.player.health;
    var toRender;
    var gameInfoText = "";
    // var darkTheme = {
    //   appBar:{
    //     height:50
    //   },
    //   fontFamily: 'Roboto, sans-serif',
    //   palette: {
    //     primary1Color: grey900,
    //     primary2Color: grey800,
    //     primary3Color: fullBlack,
    //     accent1Color: pinkA200,
    //     accent2Color: grey100,
    //     accent3Color: grey500,
    //     textColor: white,
    //     alternateTextColor: white,
    //     canvasColor: grey800,
    //     borderColor: grey300,
    //     disabledColor: fade(darkBlack, 0.3),
    //     pickerHeaderColor: cyan500,
    //     clockCircleColor: fade(darkBlack, 0.07),
    //     shadowColor: fullBlack,
    //   }
    // };
    // var lightTheme = {
    //   appBar:{
    //     height:50
    //   },
    //   fontFamily: 'Roboto, sans-serif',
    //   palette: {
    //     primary1Color: cyan500,
    //     primary2Color: cyan700,
    //     primary3Color: grey400,
    //     accent1Color: pinkA200,
    //     accent2Color: grey100,
    //     accent3Color: grey500,
    //     textColor: darkBlack,
    //     alternateTextColor: white,
    //     canvasColor: white,
    //     borderColor: grey300,
    //     disabledColor: fade(darkBlack, 0.3),
    //     pickerHeaderColor: cyan500,
    //     clockCircleColor: fade(darkBlack, 0.07),
    //     shadowColor: fullBlack,
    //   },
    // };
    
    var muiTheme = getMuiTheme(this.state.themes);

    var changeTheme = function(theme){
      console.log('newtheme', theme);
      muiTheme = getMuiTheme(theme);
    }
    
    
    console.log(muiTheme.palette.primary2Color);
    if (true || Object.keys(_grid).length === this.state.rules.numSpaces) {
      // If there is a challenge, display the challenge prompt
      if (this.state.currentChallenge) {
        gameInfoText = this.state.currentChallenge.prompt;
      }
      // Render the gameboard, gameinfo, and text input field
      toRender = (
        <MuiThemeProvider muiTheme={muiTheme}>
          <Paper id="app">
            <AppBar
              title="It's a Game!"
              onLeftIconButtonTouchTap={this.handleDrawerToggle.bind(this)}
              iconElementRight={<FlatButton label="Login" />}
            />
            <Drawer 
              open={this.state.drawerOpen}
              onRequestChange={function(){console.log('requestchange')}}
              width={200}
            >
              <MenuItem onTouchTap={function(){ 
                this.handleDrawerToggle();
                changeTheme(lightTheme);
              }.bind(this)}
              >Dark Theme</MenuItem>
              <MenuItem onTouchTap={function(){ 
                this.handleDrawerToggle();
                changeTheme(lightTheme);
              }.bind(this)}
            >Light Theme</MenuItem>
            </Drawer>
            <Card className="game-display" style={{backgroundColor: muiTheme.palette.primary3Color}}>
              <PlayerStatus health={_health} />
              <Grid grid={_grid} />
              <Gameinfo gameInfoText={gameInfoText} theme={muiTheme.palette.primary2Color}/>
              <Textfield checkAnswer={this.checkAnswer.bind(this)} theme={muiTheme.palette.primary2Color} />
            </Card>
          </Paper>
        </MuiThemeProvider>
      );
    } else {
      // If the gameboard is not ready, display a loading statement
      toRender = (<div id="loading">Loading . . . </div>);
    }
    return toRender;
  }
}

export default App;
