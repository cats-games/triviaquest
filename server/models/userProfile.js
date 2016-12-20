var db = require('../../config/db');
var findOneOrCreate = require('mongoose-find-one-or-create');

// Schema/models:
var UserProfileSchema = new db.Schema({
  userName: String,
  highScores: Array,
  health: Number,
  userId: String,
  currentWorld: Array
});

UserProfileSchema.plugin(findOneOrCreate);

var UserProfile = db.model('UserProfile', UserProfileSchema);

module.exports = UserProfile;


