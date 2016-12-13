import React, { PropTypes } from 'react';

class Counter extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      counter: 0
    };
  }

  render() {
    return (
      <div onClick={() => this.setState({counter : this.state.counter + 1})} className="counter">{this.state.counter}</div>
    );
  }
}

export default Counter;
