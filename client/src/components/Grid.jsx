class Grid extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      spaces: {},
      challenges: [],
      score: 0
    };

    this.numSpaces = 25;
  }

  componentWillMount() {
    // Initialize player position
    this.setState({playerPosition: 1});
    // Check for navigation keys
    window.addEventListener('keydown', this.handleKeyDown.bind(this));

    this.initializeBoard();
    this.getChallenges();
  }

  componentWillUpdate(nextProps, nextState) {
    // Check if challenges exist
    if (this.state.challenges.length === 0 && nextState.challenges.length) {
      var challenges = nextState.challenges.slice();
      this.populateEnemiesAndChallenges(challenges);
    }
  }

  // Get challenges from API and update state
  getChallenges() {
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

  // Initialize board spaces with an ID number and no enemies
  initializeBoard() {
    for (var i = 1; i <= this.numSpaces; i++) {
      this.state.spaces[i] = {
        id: i,
        challenge: undefined,
        hasEnemy: false
      };
    }
    console.log('board initialized!');
  }

  populateEnemiesAndChallenges(challenges) {
    // Populate the spaces with enemies
    var enemySquares = this.generateEnemySquares();

    enemySquares.forEach(function(enemy) {
      var challenge = challenges.pop();
      if (challenge) {
        // Add a challenge to this space
        this.state.spaces[enemy]['challenge'] = challenge;
        this.state.spaces[enemy]['hasEnemy'] = true;
      }
    }.bind(this));
  }

  // Generates an array of shuffled enemy positions
  generateEnemySquares() {
    var enemySquares = _.range(1, this.numSpaces + 1);
    // Skip the position that the player is on
    enemySquares.splice(this.state.playerPosition - 1, 1);

    this.shuffle(enemySquares);

    return enemySquares;
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
    var rows = Math.sqrt(this.numSpaces);
    if (e.which === 72) {
      // h / move left
      if ((this.state.playerPosition - 1) % rows !== 0) {
        this.setState({playerPosition: this.state.playerPosition - 1});
      }
    } else if (e.which === 74) {
      // j / move down
      if (this.state.playerPosition <= rows * (rows - 1)) {
        this.setState({playerPosition: this.state.playerPosition + rows});
      }
    } else if (e.which === 75) {
      // k / move up
      if (this.state.playerPosition > rows) {
        this.setState({playerPosition: this.state.playerPosition - rows});
      }
    } else if (e.which === 76) {
      // l/ move right
      if (this.state.playerPosition % rows !== 0) {
        this.setState({playerPosition: this.state.playerPosition + 1});
      }
    }
  }

  render() {
    var question = '';
    var spaces = this.state.spaces;
    var position = this.state.playerPosition;

    if (spaces[position].challenge) {
      question = spaces[position].challenge.prompt;
    }

    var gridNumber = 0;
    return (
      <div>
        <div id="grid" onKeyDown={this.setplayerPosition}>
        {Object.keys(this.state.spaces).map(() => {
            gridNumber++;
            var activated = this.state.playerPosition === (gridNumber) ? "activated " : "";
            var enemy = this.state.spaces[gridNumber].hasEnemy ? "enemy" : "";
            return (<div className={"gridbox " + activated + enemy} id={gridNumber}>{gridNumber}</div>);
          })
        }
      </div>
      <Gameinfo cats={question}/>
      <Textfield />
    </div>
    );
  }
}

window.Grid = Grid;