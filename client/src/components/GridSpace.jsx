'use strict';

import React from 'react';

var GridSpace = ({type, id}) => {
  var toRender;

  if (type === 'player') {
    toRender = (<div id={id} className="gridbox player"></div>);
  } else if (type === 'enemy') {
    toRender = (<div id={id} className="gridbox enemy"></div>);
  } else if (type === 'fight') {
    toRender = (<div id={id} className="gridbox fight"></div>);
  } else if (type === 'potion') {
    toRender = (<div id={id} className="gridbox potion"></div>);
  } else if (type === 'grass') {
    toRender = (<div id={id} className="gridbox"></div>);
  } else if (type === 'water') {
    toRender = (<div id={id} className="gridbox water"></div>);
  } else if (type === 'wall') {
    toRender = (<div id={id} className="gridbox wall"></div>);
  } else if (type === 'door') {
    toRender = (<div id={id} className="gridbox door"></div>);
  } else if (type === 'door-open') {
    toRender = (<div id={id} className="gridbox door-open"></div>);
  } else {
    // default
    toRender = (<div id={id} className="gridbox"></div>);
  }

  return (toRender);
};

export default GridSpace;
