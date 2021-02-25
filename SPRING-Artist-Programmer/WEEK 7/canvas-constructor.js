// This waits for the HTML document to load before doing anything with JS
$(document).ready(function(){

  const canvas = document.getElementById("canvas");
  const ctx = canvas.getContext("2d");
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  ctx.fillStyle = "black";
  // X pos, Y pos, width, height
  ctx.fillRect( 0, 0, canvas.width, canvas.height );


  // Number of particles we create at once in a batch
  let particleNum = 5;

  // Position of our particle within our object holding all our particles
  let particleIndex = 0;

  // A object to store all of the particles that we create
  let particles = {};

  // Constructor function
  function Particle() {
    // Our particles will always come from the center
    this.x = canvas.width / 2;
    this.y = canvas.height / 2;
    this.directionX = Math.random() * 10 - 5;
    this.directionY = Math.random() * 10 - 5;

    // This is how we store our particles in an object
    // So that we can iterate over our object to use our draw function later
    particleIndex++;
    // This represents the particle that was just created
    particles[ particleIndex ] = this;

    this.id = particleIndex;

    // The difference of life and death is the max num of particles we'll have at a time
    this.life = 0;
    this.death = 100;

    let degrees = parseInt( Math.random() * 360 );
    this.color = "hsl(" + degrees + ", 60%, 50%)";
  }

  // This will actually draw the particles
  Particle.prototype.draw = function() {
    // Start in the middle, and then draw randomly outward
    this.x += this.directionX;
    this.y += this.directionY;

    // This is a safeguard so we don't draw too many particles and stress the browser
    this.life++;
    if( this.life > this.death ) {
      delete particles[ this.id ];
    }

    ctx.fillStyle = this.color;

    // This is standard HTML5 Canvas drawing a cirlce
    // https://www.w3schools.com/tags/canvas_arc.asp
    ctx.beginPath();
    // x, y, radius, start point, end point, direction in degrees
    ctx.arc( this.x, this.y, 10, 0, Math.PI * 2, false );
    ctx.fill();

  }

  function drawTheParticles() {

    // For loop to generate particles in batches
    for ( var i = 0; i < particleNum; i++ ) {
      new Particle();
    }

    // Refills the background
    ctx.fillStyle = "rgba(0, 0, 0, 0.1)";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // For loop to draw the particles that were previously generated
    for(var i in particles) {
      particles[i].draw();
    }

  }

  // Run the nested code every X amount of time over and over
  setInterval( function(){
    drawTheParticles();
    // console.log("Particles: ", particles)
  }, 30);


});
