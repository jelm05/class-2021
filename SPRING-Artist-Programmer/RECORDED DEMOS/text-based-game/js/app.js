
$(document).ready(function(){
  
  // console.log(storylines)
  
  const $text = $("div#text > p");
  const $storyOptions = $("div#story-options");
  
  let state = {};
  
  function startGame() {
    state = {}; 
    showStoryChoice(1);
  }
  
  function showStoryChoice(storyId) {
    // console.log(storyId)
    // console.log(storylines[0])

    console.log("state", state)

    let storyChoice = storylines.find(function(story){
      return story.id === storyId
    });
    
    // console.log(storyChoice)
    $text.text(storyChoice.text)
    
    $storyOptions.empty();
    
    storyChoice.options.forEach(function(option){
      
      if( showOption(option) ) {
        // console.log("Showing:", option)
        
        let $button = $("<button/>",
          {
            text: option.text,
            class: 'btn',
            click: function(){ selectOption(option) }
          }
        );
        
        $storyOptions.append($button)
        
      }
      
    });
  
  }
  
  function selectOption(option) {
    
    // console.log("Option selected:", option)
    
    let storyId = option.nextStory;
    
    // End the game and start over 
    if( storyId <= 0 ) {
      return startGame();
    }
    
    // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/assign
    // Takes a current state and add everything from option.setState property
    // It will also override any of the same properties 
    // option.setState takes priority 
    // Always returns a new object 
    state = Object.assign(state, option.setState)
    showStoryChoice(storyId)
    
    // console.log("state:", state)
    // console.log("story id:", storyId)
    
  }
  
  function showOption(option) {
    // We need to check for a required state 
    return option.requiredState == null || option.requiredState(state)
  }
  
  startGame();
  
});