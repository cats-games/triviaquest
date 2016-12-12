'use strict';

import React from 'react';
import ReactDOM from 'react-dom';

var PlayerStatus = ({health}) => {
  var hearts = [];
  for(var i = 1; i <=5; i++){
    if(health>=i*20){
      hearts.push(<div className="heart-full"></div>);
    } else {
      hearts.push(<div className="heart-empty"></div>);
    }
  }
	return (
		<div id="heart-display">
      {hearts}
    </div>
  );
};

export default PlayerStatus;
