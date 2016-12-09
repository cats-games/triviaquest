var mongoose = require('mongoose');

// Connect to database.
mongoose.connect('mongodb://localhost:27017/cats');
mongoose.connection.on('error', function(error) {
  console.log('CONNECTION ERROR----> ', error);
});
mongoose.connection.on('open', function() {
  console.log('CONNECTED');
});

module.exports = mongoose;

// Sources:
// https://www.npmjs.com/package/mongoose
// https://docs.mongodb.com/manual/reference/mongo-shell/