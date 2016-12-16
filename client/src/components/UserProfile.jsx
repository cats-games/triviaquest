'use strict'

import React from 'react';
import ReactDOM from 'react-dom'

var UserProfile = ({state, highScores, swapProfileView, logout}) => {
  const styles = {
    h3: {
      marginTop: 20,
      fontWeight: 400,
    },
    block: {
      display: 'flex',
    },
    block2: {
      margin: 10,
    },
    pre: {
      overflow: 'hidden', // Fix a scrolling issue on iOS.
    },
  };
  // Want to make the avatar img change when player changes charactors...
  return (
    <div id= "user-profile">
      <div id= "avatar">
        <div>
          <img src="../../img/p1_stand.png"></img>
        </div>
        <div>
          <span className= "github-name">{state.profile ? state.profile.name : ''}</span>
        </div>
      </div>
      <div id= "curr-score-board">
        <div className= "current-score">
          Current Score: <span>One Million</span>
        </div>
        <div className= "current-world">
          Current World: <span>Oz</span>
        </div>
      </div>
      <div id= "high-score-board">
        <div className= "high-score-header">High Scores</div>
        <div className= "high-scores">
          {highScores.map(val =>
            <div className= "high-score">{val} on 12/24/1980</div>
          )}
        </div>
      </div>
      <div id="profile-footer">
        <a href="#" onClick={swapProfileView}>Resume</a>
        <a href="#" onClick={logout}>Quit</a>
      </div>
    </div>
  );
};

export default UserProfile;