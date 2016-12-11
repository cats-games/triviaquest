'use strict';

import React from 'react';

var GridSpace = ({type, text}) => {
  var toRender;

  if (type === 'player') {
    toRender = (<div className="gridbox activated">{text}</div>);
  } else if (type === 'enemy') {
    toRender = (<div className="gridbox enemy">{text}</div>);
  } else {
    toRender = (<div className="gridbox">{text}</div>);
  }

  return (toRender);
};

export default GridSpace;
