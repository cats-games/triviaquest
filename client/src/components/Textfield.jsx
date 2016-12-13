import React from 'react';
import ReactDOM from 'react-dom';
import TextUI from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';

var Textfield = ({checkAnswer}) => {

  const style = {
    margin: 12
  };

  return (
    <div id="textfield">
      <form>
        <TextUI id="answer" type="text" class="textbox" name="textinput" hintText="Your answer here" />
        <RaisedButton type="submit" label="Submit" primary={true} style={style} onClick={(e) => { checkAnswer(e, $('#answer').val()) } }/>
      </form>
    </div>
  );
};

export default Textfield;
