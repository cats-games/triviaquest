var db = require('../../config/db');

// Schema/models:
var ChallengeSchema = new db.Schema({
  type: String,
  prompt: String,
  answer: String,
  level: Number
});

var Challenge = db.model('Challenge', ChallengeSchema);

module.exports = Challenge;
