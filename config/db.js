// Backend: working database
// retrieve access to mongoose
var mongoose = require('mongoose');

//c onnect to database
var port = 2000;
mongoose.connect('mongodb://localhost:27017/cats');
mongoose.connection.on('error', function(error) {
  console.log('CONNECTION ERROR----> ', error);
});
mongoose.connection.on('open', function() {
  console.log('CONNECTED');
});

// schema/models
var ChallengeSchema = new mongoose.Schema({
  prompt: String,
  answer: String,
  level: Number
});

var Challenge = mongoose.model('Challenge', ChallengeSchema);

module.exports = Challenge;

// Sources:
// https://www.npmjs.com/package/mongoose
// https://docs.mongodb.com/manual/reference/mongo-shell/