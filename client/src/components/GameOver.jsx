/*import React from 'react';
import ReactDOM from 'react-dom';

var GameOver = ({status}) => (
  <div id="gameOver" className="gameOverLogo">TEST</div>
);

*/

import React from 'react';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';


var GameOver = (props) => (
  <div id="gameOver">
    <RaisedButton label="Modal Dialog" onTouchTap={props.handleOpen} />
    <Dialog title="Dialog With Actions" actions={props.actions} modal={true} open={props.open}
    >Only actions can close this dialog.
    </Dialog>
  </div>
);

export default GameOver;
