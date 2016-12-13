var db = require('../../config/db');

// Schema/models:
var ChallengeSchema = new db.Schema({
  prompt: String,
  answer: String,
  level: Number
});

var Challenge2 = db.model('Challenge2', ChallengeSchema);

module.exports = Challenge2;
