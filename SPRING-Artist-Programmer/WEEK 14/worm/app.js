$(document).ready(function(){
  
  console.log("ready");
  
  // How many divs do we want to generate 
  const divNumber = 50;
  
  // Store all the divs we generate 
  const divStorage = [];
  
  // Generate all the html for the div.ball
  for (var i = 0; i < divNumber; i++) {
    let div = $("<div class='ball'>");
    div.appendTo("body");
    div.x = 200;
    div.y = 200;
    divStorage.push( div );
  }
  
  // console.log(divStorage)
  // console.log("first div:", divStorage[0])
  
  // Track the mouse movement 
  let mouseX, mouseY = 0;
  $(document).mousemove(function(event){
    mouseX = event.pageX;
    mouseY = event.pageY;
    // console.log("x: ", mouseX)
    // console.log("y: ", mouseY)
  });
  
  setInterval(function(){
    let currentDiv = divStorage[0];
    // console.log("currentDiv", currentDiv.y)
    
    currentDiv.x += (mouseX - currentDiv.x) / 4;
    currentDiv.y += (mouseY - currentDiv.y) / 4;
    
    // console.log(currentDiv.x)
    // console.log(currentDiv.y)
    
    currentDiv.css({
      // https://developer.mozilla.org/en-US/docs/Web/CSS/transform-function/translate3d()
      // translate3d( tx, ty, tz )
      webkitTransform: `translate3d( ${currentDiv.x}px, ${currentDiv.y}px, 0px )`
    });
    
    for (var i = 1; i < divStorage.length; i++) {
      
      currentDiv = divStorage[i]
      let previousDiv = divStorage[i-1];
      
      // console.log(currentDiv)
      // console.log(previousDiv)

      currentDiv.x += (previousDiv.x - currentDiv.x) / 4;
      currentDiv.y += (previousDiv.y - currentDiv.y) / 4;
      currentDiv.css({
        webkitTransform: `translate3d( ${currentDiv.x}px, ${currentDiv.y}px, 0px )`
      });
      
      
    
    }
    
    
    
  }, 30);
  
});













