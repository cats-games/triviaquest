import React from 'react';
import ReactDOM from 'react-dom';

class Gameinfo extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div id="gameinfo">
      {this.props.cats}
      </div>
    );
  }
}

// In the ES6 spec, files are "modules" and do not share a top-level scope
// `var` declarations will only exist globally where explicitly defined
export default Gameinfo;