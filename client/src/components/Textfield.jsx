var Textfield = ({}) => (
  <div id="textfield" contenteditable="true">
  <div contentEditable="true" class="textbox">
  text field
  </div>
  </div>
);

// In the ES6 spec, files are "modules" and do not share a top-level scope
// `var` declarations will only exist globally where explicitly defined
window.Textfield = Textfield;