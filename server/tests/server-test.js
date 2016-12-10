//import requirements
var chai = require('chai');
var expect = require('chai').expect;
var should = chai.should();
var server = require('../server');
var testData = ('../../data.txt');

//describe tests
describe('initial', function(){
  it('should connect to server', function(connection){
    chai.request(server)
    .get('/models/challenge')
    .end(function(err, res){
      res.should.have.status(200);
      done();
    });
  });
});