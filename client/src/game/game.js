// create the game instance
var game = new RL.Game();

var mapData = [
    "#########################################################################################################",
    "#.........#..........#......................................................e.........................#Z#",
    "#u...e..:.#....##....#..........................................................................e.....+.#",
    "#k........+....##....#........................e....................e.........................e........#b#",
    "#p........#..........+......................................................e...................e.....#.#",
    "#n#..#..#.#..........#......................e....e....................................................#b#",
    "#.........#...####+#+#................................e...........e.........e.........................#.#",
    "#.........#...#......#..........................................................................e.....#b#",
    "#.........#...#......#.................e...........e...............e...........e......................#.#",
    "#.........#...#......#................................................................................+.#",
    "######################################################################+################################.#",
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
    "##########################################+##########################################################+#.#",
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

var mapDataEmptyLevel = [
    "#########################################################################################",
    "#.......................................................................................#",
    "#.......................................................................................#",
    "#.......................................................................................#",
    "#.......................................................................................#",
    "#.......................................................................................#",
    "#.......................................................................................#",
    "#.......................................................................................#",
    "#.......................................................................................#",
    "#.......................................................................................#",
    "#.......................................................................................#",
    "#.......................................................................................#",
    "#.......................................................................................#",
    "#.......................................................................................#",
    "#.......................................................................................#",
    "#########################################################################################"
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
    'p': 'pirate',
    'u': 'pikachu'
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

// make the view a little smaller (10x10 characters)
game.renderer.resize(10, 10);

// get existing DOM elements
var mapContainerEl = document.getElementById('roguelike-map-container');
var consoleContainerEl = document.getElementById('roguelike-console-container');

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
