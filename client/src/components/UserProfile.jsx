'use strict'

import React from 'react'
import ReactDOM from 'react-dom'
import Avatar from 'material-ui/Avatar';

var UserProfile = ({state, swapProfileView, logout}) => {
  // Want to make the avatar img change when player changes charactors...
  return (
    <div id= "user-profile">
      <div id= "avatar">
        <div>
          <Avatar src={state.profile.picture} size={150} backgroundColor='rgba(0,0,0,0)' />
        </div>
        <div>
          <span className= "github-name">{state.profile.name}</span>
        </div>
      </div>
      <div id= "curr-score-board">
        <div className= "current-score">
          attempted: {state.currentScore.attempted},
          <br/>
          success: {state.currentScore.success},
          <br/>
          fail: {state.currentScore.fail}
        </div>
      </div>
      <div id= "high-score-board">
        <div className= "high-score-header">High Scores</div>
        <hr/>
        <div className= "high-scores">
          {state.highScores.map(highScore =>
            <div className= "high-score">
              attempted: <span>{highScore.attempted}</span>
              <br/>
              success: <span>{highScore.success}</span>
              <br/>
              fail: <span>{highScore.fail}</span>
              <hr/>
            </div>
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