
$(document).ready(function(){

  const world = $("#world");
  const floor = world.height();
  let gravity = 1;

  // let object = {
  //   key: value,
  //   key: value
  // }

  let character = {
    // X and Y position
    // We need direct and speed of movement
    // We need to initialize our character at the beginning of load
    // We need to -constantly- update the position of our character
    // in relation to arrow keys
    // Which means we need to register arrow key presses
    x: 50,
    y: 100,
    vx: 0,
    vy: 0,
    init: function() {
      this.div = $('<div>', {
        id: 'char',
        css: {
          left: this.x,
          top: this.y
        }
      }).appendTo(world);
      this.ground = floor - this.div.height();
      this.right = world.width() - this.div.width();
    },
    update: function() {
      let char = this;
      char.x += char.vx;
      char.y += char.vy;

      char.isOnGround = false;
      // Bottom:
      if( char.y >= char.ground ) {
        char.isOnGround = true;
        char.y = char.ground;
      }

      // Left:
      if( char.x < 0 ) {
        char.vx = 0;
        char.x = 0;
      }

      // Right:
      if( char.x > char.right ) {
        char.vx = 0;
        char.x = char.right;
      }

      // Top:
      // if( char.y = 0 ) {
      //   char.vy = 0;
      //   char.y = 0;
      // }

      // How fast does our guy go?
      char.vx *= 0.9;
      char.vy += gravity;

      char.div.css({
        left: char.x,
        top: char.y
      })

      console.log("X pos:", char.x)
      console.log("Y pos:", char.y)
      char.updateKeys();

    },
    updateKeys: function() {
      // Change these numerical values to alter how fast or how high the character can
      // jump or run
      let char = this;
      if(keys[LEFT]) {
        char.vx -= 2;
      }
      if(keys[RIGHT]) {
        char.vx += 2;
      }
      if(keys[UP] && char.isOnGround) {
        char.vy = -20;
      }
    }
    // No comma at the end, it's the end of our key value pairs
  };

  // All caps for globals variables
  const LEFT = 37,
        UP = 38,
        RIGHT = 39;

  // A technique to keep track of if a user is holding a button down
  let keys = {};
  $(document).keydown(function(event){
    // This indicates the keycode that's being pressed
    // console.log(event.which)
    // It's true that a key is being pressed
    keys[event.which] = true;

    // console.log("keys", keys)
  }).keyup(function(event){
    // It's no longer true that a key is being pressed
    keys[event.which] = false;
  });

  character.init();

  setInterval(function(){
    character.update();
  }, 30);

});
