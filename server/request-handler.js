// require the challenge model
var Promise = require('bluebird');
var Challenge = Promise.promisifyAll(require('./models/challenge'));


// Gets all challenges from the database
exports.getChallenges = function(request, response) {
  Challenge.find({}).then(function (challenges) {
    response.json(challenges);
  });
};