// require the challenge model
var Promise = require('bluebird');
//var Challenge = Promise.promisify(require('models/challenge'));


// Gets all challenges from the database
exports.getChallenges = function(request, response) {
  /*
  in mongoose
  Challenge.find({}).then(function (challenges) {
    response.json(challenges);
  });
  */
  // For testing:
  response.json([{
    prompt: 'This is a prompt',
    solution: 'This is the solution to the prompt',
    level: 2
  }, {
    prompt: 'This is another prompt',
    solution: 'This is the solution to the prompt',
    level: 1
  }]);
};