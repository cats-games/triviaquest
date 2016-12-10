class Grid extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      mapArray: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25]
    };
  }

  componentWillMount() {
    this.setState({activeNumber: 1});
    window.addEventListener('keydown', this.handleKeyDown.bind(this));

    $.get('/api/challenges')
      .done(challenges => { // An array of challenge objects
        this.setState({
          challenges: challenges
        });
      })
      .fail(function(error) {
        console.error('Could not get challenges:', error);
      });
  }

  componentWillUnmount() {
    window.removeEventListener('keydown', this.handleKeyDown.bind(this));
  }

  handleKeyDown(e) {
    if (e.target === document.getElementById('answer')) {
      return;
    }
    var rows = Math.sqrt(this.state.mapArray.length);
    if (e.which === 72) {
      // h / move left
      if ((this.state.activeNumber - 1) % 5 !== 0) {
        this.setState({activeNumber: this.state.activeNumber - 1});
      }
    } else if (e.which === 74) {
      // j / move down
      if (this.state.activeNumber <= rows * (rows - 1)) {
        this.setState({activeNumber: this.state.activeNumber + 5});
      }
    } else if (e.which === 75) {
      // k / move up
      if (this.state.activeNumber > rows) {
        this.setState({activeNumber: this.state.activeNumber - 5});
      }
    } else if (e.which === 76) {
      // l/ move right
      if (this.state.activeNumber % 5 !== 0) {
        this.setState({activeNumber: this.state.activeNumber + 1});
      }
    }
  }

  render() {
    var gridNumber = 1;
    return (
      <div id="grid" onKeyDown={this.setActiveNumber}>
      {this.state.mapArray.map((abox) => <div className={"gridbox " + (this.state.activeNumber === (gridNumber) ? "activated" : "")} id={gridNumber++}>{abox}</div>
      )}
    </div>
    );
  }
}

window.Grid = Grid;