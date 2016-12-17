var express = require('express');
var bodyParser = require('body-parser');
var cors = require('cors');
var handler = require('./request-handler.js');

var app = express();
var port = 8000;

app.use(cors());
app.use(bodyParser.json());
app.use(express.static('../client'));

app.listen(port);
console.log('Listening on port', port);

app.get('/api/challenges', handler.getChallenges);

app.post('/api/testresults', handler.saveTestResult);
app.get('/api/testresults', handler.getTestResult);

app.post('/api/userstats', handler.addUserStatus);
app.get('/api/userstats', handler.getUserStatus);
app.delete('/api/userstats', handler.deleteAllUsers);

module.exports = app;
