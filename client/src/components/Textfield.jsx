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




// In the ES6 spec, files are "modules" and do not share a top-level scope
// `var` declarations will only exist globally where explicitly defined
window.Textfield = Textfield;