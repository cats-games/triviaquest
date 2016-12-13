require("babel-register")({
presets: ["airbnb", "es2015", "stage-0"]
});
var Mocha = require('mocha');
var fs = require('fs');
var path = require('path');
var request = require('request');


// Instantiate a Mocha instance.
var mocha = new Mocha();

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
  process.on('exit', function () {
    var results = {
      branch: branch,
      failures: failures,
      secret: 'cats'
    };
    if (failures > 0) {
      request.post('http://localhost:8000/api/testresults', results);
      console.log(failures, 'Failing Tests');
    } else if (failures === 0) {
      request.post('http://localhost:8000/api/testresults', results);
      console.log('All Tests Passed!');
    }
    process.exit(failures);  // exit with non-zero status if there were failures
  });
});
