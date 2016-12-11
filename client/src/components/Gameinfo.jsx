import React from 'react';
import ReactDOM from 'react-dom';

var Gameinfo = ({gameInfoText}) => (
  <div id="gameinfo">{gameInfoText}</div>
);

// In the ES6 spec, files are "modules" and do not share a top-level scope
// `var` declarations will only exist globally where explicitly defined
export default Gameinfo;
