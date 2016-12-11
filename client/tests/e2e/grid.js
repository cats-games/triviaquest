describe('Grid test', function() {

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

  it('should contain a grid when the page is loaded', function(client) {
    client
      .url('http://localhost:8000')
      .waitForElementVisible('body', 1000)
      .assert.title('Learn React')
      .assert.visible('#main')
      .assert.visible('#grid')
      .assert.visible('#grid .gridbox')
      .assert.visible('#space-1')
      .assert.visible('#space-1.activated')
      .assert.visible('#space-25')
      .assert.visible('#grid .activated.gridbox')
      .expect.element('#answer').to.be.an('input');
  });

  it('should move the player when the navigation keys are pressed', function(client) {
    client.keys("l", function() {
      client.pause(1000);
      client.assert.elementPresent('#space-2.activated');
      client.assert.elementNotPresent('#space-1.activated');
    });
  });

  it('should not move player character while answering a question', function(client) {
    client.keys("llllljkkkkkjllllljkkkkk", function() {
      // Check that we are on a question.
      client.assert.elementPresent('.gridbox.activated.enemy');
      client.expect.element('#gameinfo').to.have.value.which.matches(/[A-z]+.*/);
      client.element('css selector', '.gridbox.activated.enemy', function(res) {
        client.elementIdAttribute(res.value.ELEMENT, 'id', function(id) {
          // Save current position.
          var currentId = id.value;
          // Send a bunch of keystrokes.
          client.keys("llllljkkkkkjllllljkkkkk", function() {
            client.element('css selector', '.gridbox.activated.enemy', function(res) {
              client.elementIdAttribute(res.value.ELEMENT, 'id', function(id) {
                // Verify that user is still in the same position after attempting to move player character.
                // Because we are still on a question, we are expecting the player character not to move.
                client.expect(id.value).to.equal(currentId);
              });
            });
          });
        });
      });
    });
  });

  it('should not move the player when the input field is in focus', function(client) {
     client
       .url('http://localhost:8000')
       .waitForElementVisible('body', 1000);
     client.assert.elementPresent('#space-1.activated');
     client.element('css selector', '#answer', function(res) {
       client.elementIdClick(res.value.ELEMENT, function() {
         client.keys("llllljkkkkkjllllljkkkkk", function() {
           client.assert.elementPresent('#space-1.activated');
           client.element('css selector', '#grid', function(res) {
             client.elementIdClick(res.value.ELEMENT, function() {
               client.keys("llllljkkkkkjllllljkkkkk", function() {
                 client.assert.elementNotPresent('#space-1.activated');
               });
             });
           });
         });
       });
     });
  });

  it('should move player back to previous position when response is incorrect', function(client) {
    client.url('http://localhost:8000').waitForElementVisible('body', 1000);
    // Move the character.
    client.keys("llllljkkkkkjllllljkkkkk", function() {
      client.assert.elementNotPresent('#space-1.activated');
      // Ensure we are on a enemy square.
      client.assert.elementPresent('.gridbox.activated.enemy');
      client.element('css selector', '.gridbox.activated.enemy', function(res) {
        client.elementIdAttribute(res.value.ELEMENT, 'id', function(id) {
          // Save current position.
          var currentId = id.value;
          client.element('css selector', '#answer', function(res) {
            client.elementIdClick(res.value.ELEMENT, function() {
              client.keys("WRONG ANSWER", function() {
                client.element('css selector', '#answer button', function(res) {
                  client.elementIdClick(res.value.ELEMENT, function() {
                    client.elementIdAttribute(res.value.ELEMENT, 'id', function(id) {
                      // Ensure that after a wrong answer, the player is not on the enemy square anymore.
                      client.expect(id.value).to.not.equal(currentId);
                    });
                  });
                });
              });
            });
          });
        });
      });
    });
  });

  after(function(client, done) {
    done();
  });

});
