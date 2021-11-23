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


  function makeProjectile() {
    let p = {
      x: world.width() + 50,
      y: Math.random() * ( world.height() - 40 ),
      vx: Math.random() * -10 - 5,
    };

    p.div = $("<div>", {
      css: {
        left: p.x,
        top: p.y
      }
    }).appendTo(world);

    // This will set the width according to whatever
    // the width was set to in CSS
    p.width = p.div.width();

    p.update = function() {
      p.x += p.vx;

      if( p.x < -p.width) {
        p.remove();
      }

      // We need some sort of collision detection
      if( hitTest(p.div, character.div) ) {
        p.hit();
      }

      p.div.css({
        top: p.y,
        left: p.x
      });

    };

    // This is what animates our projectiles
    let loop = setInterval(p.update, 30);

    p.remove = function() {
      clearInterval(loop);
      p.div.remove();
    };

    p.hit = function() {
      p.remove();
    };

    return p;

  }

  function makeEnemy() {
    let enemy = makeProjectile();
    // This applies our pre-defined CSS styles via class to a made projectile
    enemy.div.attr("class", "enemy");

    enemy.hit = function() {
      enemy.remove();
      character.hit();
    }

    enemy.die = function() {
      enemy.remove();
    }

    enemy.div.data("die", enemy.die);

    return enemy;
  }

  function makeGreenEnemy() {
    // This variable has all the properties of makeEnemy() AND makeProjectile()
    // So you can individuate this projectile further, make it a pickup, or harder enemy, etc.
    let greenEnemy = makeEnemy();
    greenEnemy.div.css({
      backgroundColor: "green"
    });
    return greenEnemy;
  }

  function makePickup() {
    let pickup = makeProjectile();
    pickup.hit = function() {
      pickup.remove();
      pickups++;
      // updatePickups(); --this is a UI update
    }

    pickup.die = function() {
      pickup.remove();
    }

    pickup.div.attr("class", "pickup");
    pickup.div.data("die", pickup.die);

    return pickup;

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

    if( Math.random() < 0.025) {
      makeEnemy();
    }

    if( Math.random() < 0.025) {
      makeGreenEnemy();
    }

    if( Math.random() < 0.03) {
      makePickup();
    }

  }

  // We must pass div objects here
  function hitTest(a, b) {
    let aPos = a.position();
    let bPos = b.position();

    let aLeft = aPos.left;
    let aRight = aPos.left + a.width();
    let aTop = aPos.top;
    let aBottom = aPos.top + a.height();

    let bLeft = bPos.left;
    let bRight = bPos.left + a.width();
    let bTop = bPos.top;
    let bBottom = bPos.top + a.height();

    return !( bLeft > aRight || bRight < aLeft || bTop > aBottom || bBottom < aTop );
  }




});
