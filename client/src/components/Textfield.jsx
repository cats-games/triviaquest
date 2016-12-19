import React from 'react';
import ReactDOM from 'react-dom';
import TextUI from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';

var Textfield = ({checkAnswer, state}) => {

  const style = {
    backgroundColor:'black',
    margin: 10

  };

  return (
    <div id="textfield" className={state.showPlayerProfile ? 'hidden' : ''}>
      <form>
        <TextUI id="answer" type="text" className="textbox" name="textinput" hintText="What do you wanna say?" />
        <RaisedButton type="submit" label="...is my answer!" primary={true} style={style} onClick={(e) => { checkAnswer(e, $('#answer').val()) } }/>
      </form>
    </div>
  );
};

export default Textfield;
