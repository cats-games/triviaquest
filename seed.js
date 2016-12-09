var Challenge = require('./config/db.js');
var fs = require('fs');

var seedData = fs.readFileSync('./data.txt');

var newChallenge = new Challenge(JSON.parse({seedData}));

newChallenge.save(function(err){
  if(err){
    console.log('ERROR---->', err);
  }
});
