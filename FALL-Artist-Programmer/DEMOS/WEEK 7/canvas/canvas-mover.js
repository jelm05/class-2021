$(document).ready(function(){
  console.log("ready");

  const canvas = $("#canvas")[0];
  const c = canvas.getContext("2d");

  c.fillStyle = "black";
  // X, Y, Width, Height
  c.fillRect(0, 0, canvas.width, canvas.height);

  let posX = 10;
  let posY = 10;

  // setInterval runs a bit of code over and over again at a set time
  // time is set in milliseconds
  setInterval(
    function(){

      // Overwrite the background with a transparent layer every interval
      c.fillStyle = "rgba(0, 0, 0, 0.1)"
      c.fillRect(0, 0, canvas.width, canvas.height)

      // Increment the Y position by 5, at every interval
      posY += 5;

      if (posY >= 200 ) {
        posX += 5;
      }

      // We're overwriting the fill style
      c.fillStyle = "red";
      c.fillRect(posX, posY, 50, 50)

    },
  30);


});
