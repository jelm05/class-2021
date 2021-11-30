// I don't know what happened here 


$(document).ready(function(){

  // We're making our canvas dynamically
  let canvas = $("<canvas>").appendTo("body")[0];
  let ctx = canvas.getContext("2d");
  let particles = {};
  let particleIndex = 0;
  let particleNum = 1;

  canvas.width = $(window).width();
  canvas.height = $(window).height();

  ctx.fillStyle = "black";
  // x, y, how far right, and how far down
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  // Keep track of where the mouse cursor is:
  let mouseX = 0;
  let mouseY = 0;

  // Run a function when the mouse moves over the document
  $(document).mousemove(function(event){
    mouseX = event.pageX;
    mouseY = event.pageY;
    // console.log("mouseX", mouseX);
    // console.log("mouseY", mouseY);
  });

  // Particle constructor:
  function Particle() {
    this.x = mouseX;
    this.y = mouseY;
    this.vx = Math.random() * 10 - 5;
    this.vy = Math.random() * 10 - 5;
    particleIndex++;
    // This = the current particle being made
    particles[particleIndex] = this;

    this.id = particleIndex;
    this.life = 0;
    // this.death = 20 + Math.random() * 300;
    this.death = 20;
    let degrees = parseInt(Math.random() * 360);
    // Template literal
    this.color = `hsl(${degrees}, 100%, 50%)`;
    // String concatenation
    // this.color = "hsl(" + degrees + ", 100%, 50%)";

    this.size = 1;

  }

  Particle.prototype.draw = function() {
    this.x += this.vx;
    this.y += this.vy;
    this.size += 0.1;
    this.vx *= 0.98;
    this.vy *= 0.94;
    this.life++;
    // We have to delete particles or our browser might crash
    if( this.life > this.death ) {
      delete particles[this.id];
    }
    ctx.fillStyle = this.color;
    // https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/arc
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2, false);
    ctx.fill();
    ctx.stroke();
  }


  setInterval(function(){
    for( let i = 0; i < particleNum; i++ ) {
      new Particle();
    }

    // particles is just an object with key value pairs
    // of an integer and particle
    // ex: { 1: Particle }
    for( var i in particles ) {
      particles[i].draw();
    }

  }, 30);



});
