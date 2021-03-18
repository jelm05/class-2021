$(document).ready(function(){
  
  // Declaring variables 
  // Variable to target our entire slider by the unordered list, and everything in it
  const ul = $(".slider ul");

  // Find the number of slides within the slider and store them in a variable 
  const slideCount = ul.children().length; 
  
  // Find the width of the slides, we divide by teh number of slides 
  // because we set the slider to 100% of the parent (screen), and we know 
  // we only want one slide to be showing at a time 
  const slideWidth = 100.0 / slideCount;
  
  // This is just a number to keep track of the slide that's being shown on the 
  // the screen at the current time 
  let slideIndex = 0;
  
  // We find the first and last sildes so we can clone them later 
  // To create the illusion of the loop 
  const firstSlide = ul.find("li:first-child");
  const lastSlide = ul.find("li:last-child");
  
  // Here we actually clone them 
  // First slide goes to the end, last slide goes to the beginning 
  firstSlide.clone().appendTo(ul);
  lastSlide.clone().prependTo(ul);
  
  
  // Look at all the slides via the list item tag, and we find the their width 
  // in percentages 
  // We use this to ensure they're in a row 
  ul.find("li").each(function(indx){
    // console.log("indx", indx);
    // console.log("slideWidth", slideWidth);
    
    let leftPercent = (slideWidth * indx) + "%";
    // console.log("leftPercent", leftPercent);
    
    $(this).css({ 
      left: leftPercent
    });
    
    $(this).css({ 
      width: (100 / slideCount) + "%"
    });
    
  });
  // End forcing slides to be in a row 
  
  
  // Because we cloned the last slide and prepended to the front 
  // We don't actually want to start on the last slide 
  // So we force it offscreen to the left 
  ul.css("margin-left", "-100%");
  
  
  // Event handlers to execute slide when we click the button 
  // negative and positive changes on the slideIndex according to 
  // the direction of our animation 
  $(".prev").click( () => {
    slide(slideIndex - 1);
  });
  
  $(".next").click( () => {
    slide(slideIndex + 1);
  });
  
  
  // This is the function that actually does the animation 
  function slide( newSlideIndex ) {
    // console.log("slideIndex", slideIndex)
    // console.log("newSlideIndex", newSlideIndex)
    
    // We calculate what will later be used for a left margin, because we're animating margins 
    // And we use this value as a metric to know where to position our UL 
    // Keep in mind our original slideIndex, which is how we keep track of current slide,
    // starts at zero, so the math would be 0 * (-100) - 100
    // So, the marginLeft varibale will essentially come out to either 0% or -200%
    let marginLeft = (newSlideIndex * (-100) - 100) + "%";
    // console.log("marginLeft", marginLeft)
    
    // Animate is animating the entire UL, the slides themselves are actually just nested in a line 
    // inside the UL 
    // And we animate according to the marginLeft property calculated above 
    
    ul.animate({
      "margin-left": marginLeft
    }, 400, function(){
      
      // If newSlideIndex is less than zero, then we're at the end of our UL and start over 
      if( newSlideIndex < 0 ) {
        ul.css("margin-left", ( (slideCount) * (-100) ) + "%" );
        
        newSlideIndex = slideCount - 1;
      // if newSlideIndex is greater than the number of slides we have, we're again at the End 
      // and need to start over 
      } else if ( newSlideIndex >= slideCount ) {
        ul.css("margin-left", "-100%");
        newSlideIndex = 0;
      }
      
      // Set our original variable of slideIndex to newSlideIndex so we always know where we are 
      slideIndex = newSlideIndex;
        
    });
    
  }
  

  
});

















