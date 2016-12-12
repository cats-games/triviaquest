var Challenge = require('./server/models/challenge.js');
var Challenge2 = require('./server/models/challenge2.js');

var fs = require('fs');

var seedData = fs.readFileSync('./data.txt');
var seedData2 = fs.readFileSync('./data2.txt');

var challenges = JSON.parse(seedData);
var challenges2 = JSON.parse(seedData2);

// Remove all data from the collection.
Challenge.remove({}, function () {
  // Add the new data.
  for (var i = 0; i < challenges.length; i++) {
    var newChallenge = new Challenge(challenges[i]);
    newChallenge.save(function(err, newModel){
      if (err) {
        console.log('ERROR:', err);
      }
      console.log('Success!');
      process.exit();
    });
  }
});

// Remove all data from the collection.
Challenge2.remove({}, function () {
  // Add the new data.
  for (var i = 0; i < challenges.length; i++) {
    var newChallenge2 = new Challenge2(challenges2[i]);
    newChallenge2.save(function(err, newModel){
      if (err) {
        console.log('ERROR:', err);
      }
      console.log('Success!2');
      process.exit();
    });
  }
});
