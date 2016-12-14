var chai = require('chai');
var expect = chai.expect;
var should = chai.should();
var chaiHttp = require('chai-http');
chai.use(chaiHttp);
var server = require('../server');
var handler = require('../request-handler');
var db = require('../../config/db');

// Test to check if file is being run.
describe('app', function() {
  it('should work', function() {
    expect(true).to.be.true;
  });
});
describe('server', function(){
  it('should connect to server', function(done){
    chai.request(server)
    .get('/api/challenges')
    .end(function(err, res){
      expect(res.status).to.equal(200);
      done();
    });
  });
  it('should GET all challenges', function(done){
    chai.request(server)
    .get('/api/challenges')
    .end(function(err, res){
      res.body.should.be.a('array');
      res.body[0].prompt.should.be.a('string');
      res.body[0].answer.should.be.a('string');
      res.body[0].level.should.be.a('number');
      done();
    });
  });
});
describe('results', function(){
  it('should save results from challenge', function(){
    chai.request(db)
    .get('/api/testresults')
    .end(function(err, res){
      expect(req.body.secret).to.not.equal('cats');
      res.body.branch.should.be.a('string');
      done();
    })
  });
});

// @todo: tests for setting test results

/* Aside:
If the server is running properly, you may see an error stating 3 passing / 1 failing with the message: "Uncaught error outside test suite:
  Uncaught Error: listen EADDRINUSE :::8000"
This is caused by trying to run the server multiple times at once. To resolve this, please make sure you do not have the server running while running these tests. These tests will run the server alone and close it when complete.
*/
