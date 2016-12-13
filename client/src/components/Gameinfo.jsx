import React from 'react';
import ReactDOM from 'react-dom';

var Gameinfo = (props) => (
  <div id="gameinfo" style={{backgroundColor:props.theme}}>{props.gameInfoText}</div>
);

export default Gameinfo;
