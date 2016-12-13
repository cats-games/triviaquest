// require the challenge model
var Promise = require('bluebird');
var Challenge = Promise.promisifyAll(require('./models/challenge'));
var TestResult = require('./models/testResult')


// Gets all challenges from the database
exports.getChallenges = function(request, response) {
  Challenge.find({}).then(function (challenges) {
    response.json(challenges);
  });
};

// Saves a test result into the database.
exports.saveTestResult = function(request, response) {
  if (request.secret !== 'cats') {
    response.json({status: 'wrong secret'});
  }
  new TestResult({
    branch: request.branch,
    failures: request.failures
  }).save(function () {
    response.json({status: 'done'});
  });
};
