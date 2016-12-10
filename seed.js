var Challenge = require('./server/models/challenge.js');
var fs = require('fs');

var seedData = fs.readFileSync('./data.txt');

var challenges = JSON.parse(seedData);

// Remove all data from the collection.
Challenge.remove({}, function () {
  // Add the new data.
  for (var i = 0; i < challenges.length; i++) {
    var newChallenge = new Challenge(challenges[i]);
    newChallenge.save(function(err, newModel){
      if (err) {
        console.log('ERROR---->', err);
      }
    });
  }
});