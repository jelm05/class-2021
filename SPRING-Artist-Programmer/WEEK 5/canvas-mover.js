
// Don't execute any JS code until the browser is ready and fully loaded
$(document).ready( function() {

  // console.log("ready!");

  // Vanilla JS:
  // const vanillaCanvas = document.getElementById("canvas");

  // jQuery:
  const canvas = $("#canvas")[0];
  const ctx = canvas.getContext("2d");

  ctx.fillStyle = "black";
  // X pos, Y pos, width, height
  ctx.fillRect( 0, 0, canvas.width, canvas.height );


  ctx.fillStyle = "blue"
  ctx.fillRect( 400, 400, 50, 50 );

  let posX = 20;
  let posY = 0;

  // setInterval( doSomething, how often in millseconds)

  setInterval(function() {

    ctx.fillStyle = "rgba(0, 0, 0, 0.1)";
    ctx.fillRect( 0, 0, canvas.width, canvas.height )

    if ( posY < 200 ) {
      posY += 5;
    }

    if ( posY >= 200 ) {
      posX += 5;
    }

    if( posX >= 400 ) {
      posY -= 10;
    }

    ctx.fillStyle = "red"
    ctx.fillRect( posX, posY, 30, 30 );

    // posX += 10;
    // posY += 10;

  }, 30);


});
