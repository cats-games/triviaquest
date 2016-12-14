'use strict';

import React from 'react';

var GridSpace = ({type, tile, id}) => {
  return (<div id={id} className={"gridbox " + type + " " + tile}></div>);
};

export default GridSpace;
