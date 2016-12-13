import React from 'react';
import ReactDOM from 'react-dom';
import TextUI from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';

var Textfield = (props) => {
  
  const style = {
    margin: 12
  };
  
  return (
    <div id="textfield" style={{backgroundColor:props.theme}}>
      <form onSubmit={(e) => { props.checkAnswer(e, $('#answer').val()) }}>
        <TextUI id="answer" type="text" className="textbox" name="textinput" hintText="Your answer here" />
        <RaisedButton type="submit" label="Submit" primary={true} style={style} />
      </form>
    </div>
  );
};

export default Textfield;
