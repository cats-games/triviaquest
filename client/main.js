'use strict';

import React from 'react';
import ReactDOM from 'react-dom';
import Gameinfo from './src/components/Gameinfo.jsx';
import Textfield from './src/components/Textfield.jsx';
import Grid from './src/components/Grid.jsx';
import App from './src/components/App.jsx';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import {blue300} from 'material-ui/styles/colors';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import AppBar from 'material-ui/AppBar';
import FlatButton from 'material-ui/FlatButton';
import IconButton from 'material-ui/IconButton';
import NavigationClose from 'material-ui/svg-icons/navigation/close';

function main() {
  return;
}

const muiTheme = getMuiTheme({
  appBar: {
    height: 5,
  },
  palette: {
    primary1Color: 'rgba(0, 0, 0, 0)'
  }
});

const element = (
  <div>
    <MuiThemeProvider muiTheme={muiTheme}>
      <App />
    </MuiThemeProvider>
  </div>
);

ReactDOM.render(
  element,
  document.getElementById('main')
);
