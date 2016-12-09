//Backend: working database
//retrieve access to mongo/mongoose
var mongoose = require('mongoose');
var mongo = require('mongodb');

//connect to database
var port = 2000;
mongoose.connect('mongodb://localhost:27017/cats');
mongoose.connection.on('error', function(error) {
  console.log('CONNECTION ERROR----> ', error);
});
mongoose.connection.on('open', function() {
  console.log('CONNECTED');
});

//schema/models
var ChallengeSchema = new mongoose.Schema({
  prompt: String,
  response: String,
  answer: String,
  level: Number
});
var Challenge = mongoose.model('Challenge', ChallengeSchema);


/*app.listen(port, function() {
  console.log("Listening on port: " + port);
});*/