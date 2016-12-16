var db = require('../../config/db');

// Schema/models:
var UserProfileSchema = new db.Schema({
  userName: String,
  grid: Object,
  highScores: Array,
  currentScore: Object
});

var UserProfile = db.model('UserProfile', UserProfileSchema);

module.exports = UserProfile;
