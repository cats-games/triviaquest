describe('Github', function() {

	  it('Demo test GitHub', function (client) {
		      client
		        .url('https://github.com/nightwatchjs/nightwatch')
		        .waitForElementVisible('body', 1000)
		        .assert.title('nightwatchjs/nightwatch · GitHub')
		        .assert.visible('.container h1 strong a')
		        .assert.containsText('.container h1 strong a', 'nightwatch', 'Checking project title is set to nightwatch');
		    });

	  after(function(client, done) {
		      if (client.sessionId) {
			            client.end(function() {
					            done();
					          });
			          } else {
					        done();
					      }
		    });

});

describe('Google demo test for Mocha', function() {

	  describe('with Nightwatch', function() {

		      before(function(client, done) {
			            done();
			          });

		      after(function(client, done) {
			            client.end(function() {
					            done();
					          });
			          });

		      afterEach(function(client, done) {
			            done();
			          });

		      beforeEach(function(client, done) {
			            done();
			          });

		      it('uses BDD to run the Google simple test', function(client) {
			            client
			              .url('http://google.com')
			              .expect.element('body').to.be.present.before(1000);

			            client.setValue('input[type=text]', ['nightwatch', client.Keys.ENTER])
			              .pause(1000)
			              .assert.containsText('#main', 'Night Watch');
			          });
		    });
});
