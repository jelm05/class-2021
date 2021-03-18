$(document).ready(function(){
  
  const $gallery = $("#gallery"),
        $slide = $("div", $gallery),
        pauseTime = 5000,
        fadeTime = 1000,
        totalSlides = $slide.length;
        
  let currentSlide = 0;
  let animation; 
        
  
  // Look at all the slides, hide them, but after that, show the first one
  $slide.hide().eq( currentSlide ).show();
  
  function fade(){
    // Fade out the first slide,
    // Then figure out, what's the next slide via its index 
    // stop the fade out animation, because we want to fade in the second slide 
    // Finally, fade in the next slide 
    $slide.fadeOut(fadeTime)
          .eq( ++currentSlide % totalSlides )
          .stop()
          .fadeIn(fadeTime);
  }
  
  function loop(){
    // Run our fade function every 5 seconds 
    animation = setInterval(fade, pauseTime);
  }
  
  function stop(){
    clearInterval(animation);
  }
  
  loop();

  
});