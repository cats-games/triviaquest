'use strict';

import React from 'react';
import Gameinfo from './Gameinfo.jsx';
import Textfield from './Textfield.jsx';
import Grid from './Grid.jsx';

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      challenges: [],
      score: {
        attempted: 0,
        success: 0,
        fail: 0
      }
    };

    this.numSpaces = 25;
    // !Don't run functions in the constructor!
    // !Run them in componentWillMount instead!
  }

  componentWillMount() {
    this.getChallenges();
  }

  // Get challenges from API and update state
  getChallenges() {
    $.get('/api/challenges')
      .done(challenges => { // An array of challenge objects
        this.setState({
          challenges: challenges
        });
      })
      .fail(function(error) {
        console.error('Could not get challenges:', error);
      });
  }

  render() {
    var toRender;
    if (this.state.challenges.length > 0) {
      toRender = (<Grid challenges={this.state.challenges}/>);
    } else {
      toRender = (<div id="loading">Loading . . . </div>);
    }
    return toRender;
  }
}

export default App;
