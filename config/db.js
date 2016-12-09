//Backend: working database
var mongoose = require('mongoose');
var mongo = require('mongodb');

var port = 2000;
mongoose.connect('mongodb://localhost:27017/cats');
mongoose.connection.on('error', function(error) {
  console.log('CONNECTION ERROR----> ', error);
});
mongoose.connection.on('open', function() {
  console.log('CONNECTED');
});

var UserSchema = new mongoose.Schema({
  name: String,
  score: Number,
  level: Number
});
var User = mongoose.model('User', UserSchema);


app.listen(8000, function() {
  console.log("Listening on port 8000");
});