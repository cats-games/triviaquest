'use strict';

import React from 'react';

var GridSpace = ({type, id}) => {
  return (<div id={id} className={"gridbox " + type}></div>);
};

export default GridSpace;
