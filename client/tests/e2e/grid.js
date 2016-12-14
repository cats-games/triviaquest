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
      .assert.visible('#space-1')
      .assert.visible('#space-56.gridbox.player')
      .assert.visible('#space-25')
      .expect.element('#answer').to.be.an('input');
  });

  it('should prompt player to login with github', function(client) {
    client
      .assert.visible('#main')
      .assert.visible('.a0-close');
  });

  // Test to be updated
  xit('should move the player when the navigation keys are pressed', function(client) {
    client.element('css selector', '.a0-close', function(res) {
      client.keys('h', function() {
        client.assert.elementPresent('#space-57.gridbox.player');
        client.assert.elementNotPresent('#space-56.gridbox.player');
      });
    });
  });

  //
  xit('should not move player character while answering a question', function(client) {
    client.keys("llllljkkkkkjllllljkkkkk", function() {
      // Check that we are on a question.
      client.assert.elementPresent('.gridbox.enemy');
      client.expect.element('#gameinfo').to.have.value.which.matches(/[A-z]+.*/);
      client.element('css selector', '.gridbox.enemy', function(res) {
        client.elementIdAttribute(res.value.ELEMENT, 'id', function(id) {
          // Save current position.
          var currentId = id.value;
          // Send a bunch of keystrokes.
          client.keys("llllljkkkkkjllllljkkkkk", function() {
            client.element('css selector', '.gridbox.enemy', function(res) {
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

  // Test
  xit('should not move the player when the input field is in focus', function(client) {
     client
       .url('http://localhost:8000')
       .waitForElementVisible('body', 1000);
     client.assert.elementPresent('#space-1.gridbox.player');
     client.element('css selector', '#answer', function(res) {
       client.elementIdClick(res.value.ELEMENT, function() {
         client.keys("llllljkkkkkjllllljkkkkk", function() {
           client.assert.elementPresent('#space-1.gridbox.player');
           client.element('css selector', '#grid', function(res) {
             client.elementIdClick(res.value.ELEMENT, function() {
               client.keys("llllljkkkkkjllllljkkkkk", function() {
                 client.assert.elementNotPresent('#space-1.gridbox.player');
               });
             });
           });
         });
       });
     });
  });

  // Test to be updated due to auth0 log in
  xit('should move player back to previous position when response is incorrect', function(client) {
    client.url('http://localhost:8000').waitForElementVisible('body', 1000);
    // Move the character.
    client.keys("llllljkkkkkjllllljkkkkk", function() {
      client.assert.elementNotPresent('#space-1.gridbox.player');
      // Ensure we are on a enemy square.
      client.assert.elementPresent('.gridbox.enemy');
      client.element('css selector', '.gridbox.enemy', function(res) {
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

  // Test to be completed
  xit('should decrement health when response is incorrect', function() {
    client
      .assert.visible('.heart-full')
      .assert.visible('.heart-full')
      .assert.visible('.heart-full')
      .assert.visible('.heart-full')
      .assert.visible('.heart-empty');
  });

  // Test to be completed
  xit('should end game when player is out of lives', function() {
    client.keys("WRONG ANSWER", function() {
      client.element('css selector', '#answer button', function(){})
    });
  });

  // Test to be written
  xit('should refresh page when player selects try again after loss', function() {});

  after(function(client, done) {
    done();
  });

});
