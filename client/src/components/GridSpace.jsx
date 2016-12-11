'use strict';

import React from 'react';

var GridSpace = ({type, id}) => {
  var toRender;

  if (type === 'player') {
    toRender = (<div id={id} className="gridbox player">{id}</div>);
  } else if (type === 'enemy') {
    toRender = (<div id={id} className="gridbox enemy">{id}</div>);
  } else if (type === 'fight') {
    toRender = (<div id={id} className="gridbox fight"></div>);
  } else if (type === 'grass') {
    toRender = (<div id={id} className="gridbox">{id}</div>);
  }

  return (toRender);
};

export default GridSpace;
