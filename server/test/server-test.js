var chai = require('chai');
var expect = chai.expect;
var should = chai.should();
var chaiHttp = require('chai-http');
chai.use(chaiHttp);
var server = require('../server');
var handler = require('../request-handler');

//describe tests
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

// @todo: tests for setting test results
