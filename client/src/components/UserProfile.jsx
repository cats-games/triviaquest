'use strict'

import React from 'react'
import ReactDOM from 'react-dom'
import Avatar from 'material-ui/Avatar';

var UserProfile = ({state, highScores, swapProfileView, logout}) => {
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
          attempted: {state.score.attempted},
          <br/>
          success: {state.score.success},
          <br/>
          fail: {state.score.fail}
        </div>
        <div className= "current-world">
          world: <span>{state.currentWorld}</span>
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