'use strict';

import React from 'react';

var GridSpace = ({type, id}) => {
  var toRender;

  if (type === 'player') {
    toRender = (<div id={id} className="gridbox player">{id}</div>);
  } else if (type === 'enemy') {
    toRender = (<div id={id} className="gridbox enemy">{id}</div>);
  } else if (type === 'fight') {
    toRender = (<div id={id} className="gridbox fight">{id}</div>);
  } else if (type === 'potion') {
    toRender = (<div id={id} className="gridbox potion">{id}</div>);
  } else if (type === 'grass') {
    toRender = (<div id={id} className="gridbox">{id}</div>);
  } else if (type === 'water') {
    toRender = (<div id={id} className="gridbox water">{id}</div>);
  } else if (type === 'wall') {
    toRender = (<div id={id} className="gridbox wall">{id}</div>);
  } else if (type === 'door') {
    toRender = (<div id={id} className="gridbox door">{id}</div>);
  } else if (type === 'door-open') {
    toRender = (<div id={id} className="gridbox door-open">{id}</div>);
  } else {
    // default
    toRender = (<div id={id} className="gridbox">{id}</div>);
  }

  return (toRender);
};

export default GridSpace;
