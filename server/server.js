var express = require('express');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');

var app = express();
var port = 8000; // Will need to change this when deploying.

app.use(bodyParser.json());
// app.use(express.static('STATIC FILES'));

app.listen(port);
console.log('Lisening on port', port);

// app.get('/api/challenges');

module.exports = app;