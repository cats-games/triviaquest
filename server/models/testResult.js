var db = require('../../config/db');

// Schema/models:
var TestResultSchema = new db.Schema({
  branch: String,
  failures: Number
});

var TestResult = db.model('TestResult', TestResultSchema);

module.exports = TestResult;
