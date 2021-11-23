$(document).ready(function(){

  const world = $("#world");
  const startGame = $("#start-game");
  const endGame = $("#game-over");

  let hitsUI = $("#hits");
  let timeUI = $("#time");
  let pickupsUI = $("#pickups");

  let firstPlay = true;
  // This value corresponds to #ground in style.css
  let floor = 380;
  let gravity = 1;
  let counter = 0;
  let pickups = 0;
  let mainLoop;
  let timeLoop;

  let keys = {};
  const LEFT = 37;
  const UP = 38;
  const RIGHT = 39;
  const DOWN = 40;

  // Keep track of all key downs over the entire document
  $(document).keydown(function(e){
    // This is making a key value pair on our key object
    keys[e.which] = true
    // example:
    // keys = {
    //   37: true;
    // }
  }).keyup(function(e){
    keys[e.which] = false
  });


  beginGame();



  let character = {
    // Starting position:
    x: 30,
    y: 200,
    // Direction/speed:
    vx: 0,
    vy: 0,
    hits: 0,
    reset: function() {

    },
    init: function() {
      // Whenever we invoke character.init(), a div with an ID of character
      // will be appended to our world
      this.div = $("<div>", {
        "id": "character",
        css: {
          left: this.x,
          top: this.y
        }
      }).appendTo(world);

      // Keep track of ground and the right side of the world
      this.ground = floor - this.div.height();
      this.right = world.width() - this.div.width();
    },
    hit: function() {

    },
    blink: function() {

    },
    // This update method will be run constantly in an interval
    update: function() {

      this.x += this.vx;
      this.y += this.vy;

      this.isOnGround = false;
      if( this.y > this.ground ) {
        // This prevents our character from falling through the ground
        this.y = this.ground;
        this.isOnGround = true;
      }

      // If the character is on the left side of the world
      if ( this.x < 0 ) {
        // The character can't go outside the world, and stops moving
        this.x = 0;
        this.vx = 0;
      }

      // If the character is on the right side of the world
      if( this.x > this.right ) {
        this.x = this.right;
        this.vx = 0;
      }

      this.vx *= 0.9;
      this.vy += gravity;

      // Finally, update the position of the character div according to our
      // defined rules above
      this.div.css({
        top: this.y,
        left: this.x
      });

      // Keep track of those keys that are being pressed
      this.keyInterval();

    },
    keyInterval: function() {

      // If the left key is being pressed...
      if( keys[LEFT] ) {
        // character.vx = character.vx - 2
        character.vx -= 2;
      }

      if( keys[RIGHT] ) {
        // character.vx = character.vx + 2
        character.vx += 2;
      }

      if( keys[DOWN] ) {
        character.vy += 2;
      }

      if( keys[UP] && character.isOnGround ) {
        // Change this integer if the character should jump higher
        character.vy = -20;
      }

    }
  }

  function beginGame() {

    $(document).one("click", function(){

      if( firstPlay ) {
        character.init();
        firstPlay = false;
      } else {
        character.reset();
      }

      startGame.hide();

      clearInterval(mainLoop);
      // clearInterval(timeLoop);

      // runGame() every 30 milliseconds:
      mainLoop = setInterval(runGame, 30);
      // timeLoop = setInterval(count, 1000);
    });

  }

  function runGame() {
    character.update();

    // Add enemy creation here later

  }

});
