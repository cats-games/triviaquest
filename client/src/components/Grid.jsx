class Grid extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      mapArray: {},
      challenges: []
    };

    this.spaces = 25;
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

    for (var i = 1; i <= this.spaces; i++) {
      this.state.mapArray[i] = {
        hasEnemy: false,
        id: i
      };
    }
  }

  componentWillUpdate(nextProps, nextState) {
    // Check if challenges exist
    if (this.state.challenges.length === 0 && nextState.challenges.length) {
      // Populate the mapArray with enemies
      var enemySquares = _.range(1, this.spaces + 1);
      enemySquares.splice(this.state.activeNumber - 1, 1);

      this.shuffle(enemySquares);

      enemySquares = enemySquares.slice(0, nextState.challenges.length);

      enemySquares.forEach(function(enemy) {
        this.state.mapArray[enemy]['hasEnemy'] = true;
      }.bind(this));

    }
  }

  shuffle(array) {
    console.log(array);
    for (var i = array.length - 1; i > 0; i--) { 
      var j = Math.floor(Math.random() * (i + 1)); 
      var temp = array[i]; 
      array[i] = array[j]; 
      array[j] = temp; 
    } 
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
      if ((this.state.activeNumber - 1) % rows !== 0) {
        this.setState({activeNumber: this.state.activeNumber - 1});
      }
    } else if (e.which === 74) {
      // j / move down
      if (this.state.activeNumber <= rows * (rows - 1)) {
        this.setState({activeNumber: this.state.activeNumber + rows});
      }
    } else if (e.which === 75) {
      // k / move up
      if (this.state.activeNumber > rows) {
        this.setState({activeNumber: this.state.activeNumber - rows});
      }
    } else if (e.which === 76) {
      // l/ move right
      if (this.state.activeNumber % rows !== 0) {
        this.setState({activeNumber: this.state.activeNumber + 1});
      }
    }
  }

  render() {

    var gridNumber = 1;
    return (
      <div id="grid" onKeyDown={this.setActiveNumber}>
      {Object.keys(this.state.mapArray).map((abox) => <div className={"gridbox " + (this.state.activeNumber === (gridNumber) ? "activated " : "") + (this.state.mapArray[gridNumber].hasEnemy ? "enemy" : "")} id={gridNumber++}>{abox}</div>
      )}
    </div>
    );
  }
}

window.Grid = Grid;