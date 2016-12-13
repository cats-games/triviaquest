var express = require('express');
var bodyParser = require('body-parser');
var handler = require('./request-handler.js');

var app = express();
var port = 8000;

app.use(bodyParser.json());
app.use(express.static('../client'));

app.listen(port);
console.log('Listening on port', port);

app.get('/api/challenges', handler.getChallenges);

app.post('/api/testresults', handler.saveTestResult);
app.get('/api/testresults', handler.getTestResult);

module.exports = app;
