// create the game instance
var game = new RL.Game();

var mapData = [
    "#########################################################################################################",
    "#.........#..........#......................................................e.........................+Z#",
    "#n...e..:.#....##....#..........................................................................e.....#.#",
    "#k........+....##....#........................e....................e.........................e........#.#",
    "#p........#..........+......................................................e...................e.....#.#",
    "#.#..#..#.#..........#......................e....e....................................................#z#",
    "#.........#...####+#+#................................e...........e.........e.........................#.#",
    "#.........#...#......#..........................................................................e.....#.#",
    "#.........#...#......#.................e...........e...............e...........e......................#.#",
    "#.........#...#......#................................................................................#.#",
    "######################################################################+################################b#",
    "#...#...............#...............#...........#...................#...#.............................#.#",
    "#...#...#########...#...#####...#########...#####...#####...#####...#...#.............................#.#",
    "#...............#.......#...#...........#...........#...#...#.......#...#.............................#.#",
    "#########...#...#########...#########...#####...#...#...#...#########...#.............................#.#",
    "#.......#...#...............#...........#...#...#...#...#...........#...#.............................#.#",
    "#...#...#############...#...#...#########...#####...#...#########...#...#.............................#.#",
    "#...#...............#...#...#.......#...........#...........#.......#...#.............................#.#",
    "#...#############...#####...#####...#...#####...#########...#...#####...#.............................#.#",
    "#...........#.......#...#.......#...#.......#...........#...#...........#.............................#.#",
    "#...#####...#####...#...#####...#...#########...#...#...#...#############.............................#.#",
    "#.......#.......#...#...#.......#.......#.......#...#...#.......#.......#.............................#.#",
    "#############...#...#...#...#########...#...#####...#...#####...#####...#.............................#.#",
    "#...........#...#...........#.......#...#.......#...#.......#...........#.............................#.#",
    "#...#####...#...#########...#####...#...#####...#####...#############...#.............................#.#",
    "#...#.......#...........#...........#.......#...#...#...............#...+.............................#.#",
    "#...#...#########...#...#####...#########...#...#...#############...#...#.............................#.#",
    "#...#...........#...#...#...#...#...........#...............#...#.......#.............................#.#",
    "#...#########...#...#...#...#####...#########...#########...#...#########.............................#.#",
    "#...#.......#...#...#...........#...........#...#.......#...............#.............................#.#",
    "#...#...#####...#####...#####...#########...#####...#...#########...#...#.............................#.#",
    "#.e.#...................#...........#...............#...............#...#.............................#.#",
    "##########################################+##########################################################+#b#",
    "#......................#.................#......#.................#.........................#.........#.#",
    "#..##################..#.#########.#.#.###.#....#.###...###########.#.######.##############.#.#######.#.#",
    "#..#................#..#.....#...#.#.#.....########.###.............#........#............#.#.#.......#.#",
    "#..#..############..#..#####.#.#.#.#.#####..........#.#.##.#################.######.#####.#.#.#.#######.#",
    "#..#..#.............#..#...#.#.#.#.#.....#.######.#.#...#..#...#.#........................#..........##.#",
    "#..#..#...###########..#.#.#.#.#.###.##.##..........#.#.#.##.#.#.##############.###########.########.##.#",
    "#.....#................#.#...#.#...#.##.#..#####.##.#.#...#..#............................#...........#.#",
    "######################...#.#.#.#.#.#.#..#.........#.#...#...#######################.############.####.#.#",
    "#..#...................#...#.#.#.#...#.########.#.#.#######.#.....................#.#............#....#.#",
    "#..#.#################...##.##.###.#.#.#....+.#.#.#.........#.#####################.#.#.#######..####.#.#",
    "#..#.#.#...#...#...#...#.##.#.####.#.#.#....#.#.#.#.###.#####.......................#.#.#.....#..#....#.#",
    "#..#.#...#...#...#...#....#.#.####.#.#.######.#.#.#.#.#.......#####################.#.#.#.#.#.#..#.####.#",
    "#..#.#.#...#...#...#...####.#......#.#...+..#.#.....#.#.#######...................#.#.#.#.#.#.#..#....#.#",
    "#..#.#.#################.#..#####..#####.####.#####.#.#.........###################.#.#.#.#.#.#..#.####.#",
    "#..#.....................#......#........#..............#########...................#.#.#.#.#.#..#....#.#",
    "#..#.##########################.########.#.########.######........#################.#.#.#.#.#.#..##.###.#",
    "#..#.#..................................................#..######.#.................#.#.#.#.#.#...#...#.#",
    "#..#.####################.###############################.##......##############.##########.#####.###.#.#",
    "#..#....................#.................................#..####..............#..........#.....#.....#.#",
    "#..###################..#.################.############################.#############.#########.#####.#.#",
    "#.......................#................#............................................................#.#",
    "#+#####################################################################################################.#",
    "#.......................................................................................................#",
    "#########################################################################################################"
];

// Tile types
var mapCharToType = {
    '#': 'wall',
    '.': 'grass',
    '+': 'door',
    '\'': 'door-open'
};

var entityCharToType = {
    'e': 'slime',
    'Z': 'owl',
    'b': 'bird',
    'n': 'ninja',
    'k': 'knight',
    'p': 'pirate'
};

var itemCharToType = {
  ':': 'potion'
};

var keyBindings = {
    up: ['UP_ARROW', 'K', 'W'],
    down: ['DOWN_ARROW', 'J', 'S'],
    left: ['LEFT_ARROW', 'H', 'A'],
    right: ['RIGHT_ARROW', 'L', 'D'],
};

game.map.loadTilesFromArrayString(mapData, mapCharToType, 'grass');
game.itemManager.loadFromArrayString(mapData, itemCharToType);
game.entityManager.loadFromArrayString(mapData, entityCharToType);

// generate and assign a map object (repaces empty default)
game.setMapSize(game.map.width, game.map.height);

// add input keybindings
game.input.addBindings(keyBindings);

// set player starting position
game.player.x = 3;
game.player.y = 3;

// make the view a little smaller
game.renderer.resize(10, 10);

// get existing DOM elements
var mapContainerEl = document.getElementById('example-map-container');
var consoleContainerEl = document.getElementById('example-console-container');

// append elements created by the game to the DOM
mapContainerEl.appendChild(game.renderer.canvas);
consoleContainerEl.appendChild(game.console.el);

game.renderer.layers = [
    new RL.RendererLayer(game, 'map',       {draw: false,   mergeWithPrevLayer: false}),
    new RL.RendererLayer(game, 'item',      {draw: false,   mergeWithPrevLayer: true}),
    new RL.RendererLayer(game, 'entity',    {draw: false,   mergeWithPrevLayer: true}),
    new RL.RendererLayer(game, 'lighting',  {draw: true,    mergeWithPrevLayer: false}),
    new RL.RendererLayer(game, 'fov',       {draw: true,    mergeWithPrevLayer: false})
];

// start the game


class GameAppConnector {
  ////////////////
  // INITIALIZE //
  ////////////////

  constructor(app) {
    this.game = window.game;
    this.game.start();
    this.app = app;
    this.grid = undefined;
    this.challenges = [];

    // Get challenges from the server and update this.challenges
    // Then, assign each slime entity a challenge
    this.getChallenges(this.assignChallenges.bind(this));
  }

  setGrid(grid) {
    this.grid = JSON.parse(JSON.stringify(this.app.state.grid));
    for (var key in this.grid) {
      this.grid[key].image = 'water';
    }
  }

  getChallenges(callback) {
    $.get('/api/challenges')
      .done(function(challenges) {
        challenges = shuffle(challenges); // Shuffle the arrangement of the challenges
        // Save the challenges
        this.challenges = challenges;
        callback();
      }.bind(this))
      .fail(function(error) {
        console.log('Error');
      });
  }

  assignChallenges() {
    var entities = this.game.entityManager.objects;
    entities.forEach(function(entity) {
      if (entity.type === 'slime') { // Assign challenges to slimes
        // Pluck off a challenge
        var challenge = this.challenges.pop();
        // Assign it to the slime
        entity.challenge = challenge;
      }

    }.bind(this));
  }

  // Run this when we have the profile nickname.
  assignGitChallenges() {
    // For now this only sets one challenge (hence the hardcoded challenge ID).
    var entities = this.game.entityManager.objects;
    entities.forEach(function(entity) {
      if (entity.type === 'owl') {
        this.setGitChallenge(entity, 1);
      }
    }.bind(this));
  }

  // Accessed by assignGitChallenges and by bump()
  setGitChallenge(entity, gitChallengeId) {
    // Dummy answer, these are challenges without an answer. You pass the challenge when 0 tests fail.
    // @todo: hide the answer box on git challenges
    var answer = '🤗 secret answer 🤗';
    var branch = 'challenge-' + gitChallengeId + '-' + this.app.state.profile.nickname;
    entity.challenge = {
      prompt: 'Hoo hoo! Hoo Hoo! Git challenge! Step 1: Git clone the master branch from git@104.236.47.47:solution.git. The password is "solution". Step 2: Implement a React component in a file called "Counter.js" that renders a div with a class of "counter" and an initial value of 0. Every time the div is clicked, ensure the value is incremented by one. Step 3: whenever you are finished, push to the "' + branch + '" branch. This will trigger some tests that will take few minutes to run. Check back with me about a minute after pushing to see if the tests passed! Hoo hoo!',
      answer: answer
    }
    entity.gitChallengeId = gitChallengeId;
  }

  checkGitChallenge(entity) {
    if (!entity.gitChallengeId) {
      console.error('error checking git challenge');
      return
    }
    var answer = '🤗 secret answer 🤗';
    var branch = 'challenge-' + entity.gitChallengeId + '-' + this.app.state.profile.nickname;
    $.get('/api/testresults', {branch: branch})
      .done(function(results) {
        if (results.branch === branch) {
          var failures = results.failures;
          if (failures === 0) {
            window.game.console.log('All tests passed! Congratulations, you passed the challenge!');
            entity.dead = true;
            window.game.entityManager.update();
            this.app.setState({currentEnemy: undefined});
          }
          else {
            entity.challenge = {
              prompt: 'Hoo hoo! Hoo Hoo! Almost there! ' + failures + ' tests are still failing. Try the git challenge again by pushing another solution to the "' + branch + '" branch on git@104.236.47.47:solution.git. The password is "solution". The challenge is: Implement a React component in a file called "Counter.js" that renders a div with a class of "counter" and an initial value of 0. Every time the div is clicked, ensure the value is incremented by one. Check back with me about a minute after pushing to see if the tests passed! Hoo Hoo!',
              answer: answer
            }
          }
        }
      }.bind(this))
      .fail(function(error) {
         console.log('Error');
      });
  }

  //////////////
  // CONSTANT //
  //////////////

  drawSquare(x, y, char) {
    var gridNumber = (y * 10) + (x + 1);
    var contents = null;
    var tile = null;

    if (char === '@') {
      contents = 'player';
    } else {
      if (mapCharToType[char]) {
        contents = mapCharToType[char];
        tile = 'tile';
      } else if (entityCharToType[char]) {
        contents = entityCharToType[char];
        tile = 'entity';
      } else if (itemCharToType[char]) {
        contents = itemCharToType[char];
        tile = 'item'
      } else {
        return; // If the character doesn't match up to anything known
      }
    }

    this.grid[gridNumber] = {
      id: gridNumber,
      image: contents,
      tile: tile
    };

  }

  updateGrid() {
    this.app.setState({
      grid: this.grid
    });
  }
};

/////////////
// HELPERS //
/////////////

// Shuffle an array's contents
// Used to shuffle the order of challenges received from the server
function shuffle(array) {
  for (var i = array.length - 1; i > 0; i--) { 
    var j = Math.floor(Math.random() * (i + 1)); 
    var temp = array[i]; 
    array[i] = array[j]; 
    array[j] = temp; 
  } 
  return array;
}
