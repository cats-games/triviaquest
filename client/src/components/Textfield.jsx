import React from 'react';
import ReactDOM from 'react-dom';

var Textfield = ({checkAnswer}) => {

  return (
    <div id="textfield">
      <form onSubmit={(e) => { checkAnswer(e, $('#answer').val()) }}>
        <input id="answer" type="text" class="textbox" name="textinput" />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default Textfield;