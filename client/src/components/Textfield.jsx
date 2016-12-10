var Textfield = ({}) => (
  <div id="textfield" contenteditable="true">
  <form>
    <label>
    <input id="answer" type="text" class="textbox" name="textinput" />
    </label>
    <input type="submit" value="Submit" />
  </form>
  </div>
);

// In the ES6 spec, files are "modules" and do not share a top-level scope
// `var` declarations will only exist globally where explicitly defined
window.Textfield = Textfield;