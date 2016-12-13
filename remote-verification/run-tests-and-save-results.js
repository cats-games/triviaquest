require("babel-register")({
  presets: ["airbnb", "es2015", "stage-0"]
});
var Mocha = require('mocha');
var fs = require('fs');
var path = require('path');
var request = require('request');


// Instantiate a Mocha instance.
var mocha = new Mocha();

if (!process.argv[2]) {
  console.error('Please provide a branch!');
  process.exit();
}
var branch = process.argv[2];
branch = branch.replace(/[\W-_]+/g,"");

var testDir = 'test/' + branch;

// Add each .js file to the mocha instance
fs.readdirSync(testDir).filter(function(file){
    // Only keep the .js files
    return file.substr(-3) === '.js';

}).forEach(function(file){
    mocha.addFile(
        path.join(testDir, file)
    );
});

// Run the tests.
mocha.run(function(failures){
  var running = false;
  process.on('beforeExit', function () {
    if (running) {
      return;
    }
    running = true;
    var results = {
      branch: branch,
      failures: failures,
      secret: 'cats'
    };
    if (failures > 0) {
      console.log(failures, 'Failing Tests');
    } else if (failures === 0) {
      console.log('All Tests Passed!');
    }

    var options = {
      method: 'POST',
      uri: 'http://localhost:8000/api/testresults',
      json: results
    };

    request(options, function (error, response, body) {
      if (!error && response.statusCode == 200) {
        // nothing
      } else {
        console.log(error);
      }
    });
  });
});
