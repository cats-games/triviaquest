import React from 'react';
import ReactDOM from 'react-dom';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';


var GameOver = (props) => {
  var open = false;
  var checkHealth = () => {
    if(props.health <= 0){
      open = true;
    } else {
      return false;
    }
  }
  checkHealth();

  var refresh = () => {
    window.location.reload();
  };

  var actions = [
      <FlatButton label="Try Again" primary={true} disabled={false} onClick={refresh} />
    ];
  return (
  <div>
    <Dialog title="GAME OVER!!!" actions={actions} modal={true} open={open}
    >Sorry, good luck next time.
    </Dialog>
  </div>
)};

export default GameOver;
