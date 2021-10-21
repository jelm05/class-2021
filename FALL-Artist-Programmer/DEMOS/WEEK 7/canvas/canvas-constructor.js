$(document).ready(function(){

  const canvas = $("#canvas")[0];
  const ctx = canvas.getContext("2d");

  // Store particles here
  let particles = {};
  let particleIndex = 0;

  // How many particles will we be drawing?
  let particleNum = 20;

  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  ctx.fillStyle = "black";
  // X, Y, Width, Height
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  // Using a constructor function
  function Particle() {
    // Starting point for our particles
    this.x = canvas.width/2;
    this.y = canvas.height/2;

    this.vx = Math.random() * 10 - 5;
    this.vy = Math.random() * 10 - 5;

    // I can't test this yet but it might be broken:
    let degrees = parseInt( Math.random() * 360 );
    this.color = "hsl(" + degrees + ", 98%, 50%)";

    // particleIndex will function like an ID
    // It increments every time a particle is drawn
    particleIndex++;
    // We insert our particle object that was made via constructor
    // In the position of the particles object according to its ID
    particles[particleIndex] = this

    this.id = particleIndex;

    // We need to delete old particles or the machine will stress
    this.life = 0;
    this.death = 100;
  }

  Particle.prototype.draw = function() {
    // Increment the x/y position of our particle everytime
    // the draw function is invoked
    // And remember, vx and vy are
    this.x += this.vx;
    this.y += this.vy;
    this.life++;

    if(this.life > this.death) {
      delete particles[this.id]
    }

    ctx.fillStyle = this.color;

    ctx.beginPath();
    // x, y, radius, startpoint, endpoint, direction in degrees
    // Math.PI * 2 = 360degrees
    ctx.arc(this.x, this.y, 9, 0, Math.PI * 2, false);
    ctx.fill();

    console.log("Particle was drawn")
  }

  function drawTheParticles() {

    for (var i = 0; i < particleNum; i++) {
      // This create the particles and stashes them in our object
      new Particle();
      console.log(particles)
    }

    for(var i in particles) {
      // Individually invoke each particles unique draw function
      particles[i].draw();
    }

  }

  setInterval(function(){
    drawTheParticles();
  }, 1000);

});
