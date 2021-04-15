$(document).ready(function(){
  
  const LEFT = 37;
  const UP = 38;
  const RIGHT = 39;
  
  const world = $("#world");
  const floor = world.height();
  const gravity = 1;
  
  let character = {
    x: 50,
    y: 100,
    vx: 0,
    vy: 0,
    
    init: function() {
      console.log("init")
      
      this.div = $("<div>", {
        id: "char",
        css: {
          left: this.x,
          top: this.y
        }
      }).appendTo(world);
      
      this.ground = floor - this.div.height();
      this.right = world.width() - this.div.width();

    },
    
    update: function() {
      // console.log("update")
      
      let c = this;
      c.x += c.vx;
      c.y += c.vy;
      
      c.isOnGround = false;
      
      // Add boundaries and logic to our world
      if( c.y >= c.ground) {
        c.isOnGround = true;
        c.y = c.ground;
      }
      
      // Left side
      if( c.x < 0 ) {
        c.vx = 0;
        c.x = 0;
      }
      
      // Right side 
      if ( c.x > c.right ) {
        c.vx = 0;
        c.x = c.right;
      }
      
      // Gravity
      c.vx *= 0.9
      c.vy += gravity;
      
      c.div.css({
        left: c.x,
        top: c.y
      });
      
      c.updateKeys();
      
    },
    
    updateKeys: function() {
      // console.log("update keys")
      
      let c = this;
      
      // Is it true that the left button is being pressed 
      if( keys[LEFT] ) { 
        c.vx -= 2;
      }
      
      if( keys[RIGHT] ) { 
        c.vx += 2;
      }
      
      if( keys[UP] && c.isOnGround ) { 
        c.vy = -20;
      }
      
    }
    
  };
  

  // Keeping track of whether or not a key is being held down
  let keys = {};
  
  $(document).keydown(function(event){
    keys[event.which] = true;
    // console.log("before", keys)
  }).keyup(function(event){
    keys[event.which] = false;
    // console.log("after", keys)
  });
  
  
  
  character.init();
  setInterval(function(){
    character.update();
  }, 30);
  
  
});










