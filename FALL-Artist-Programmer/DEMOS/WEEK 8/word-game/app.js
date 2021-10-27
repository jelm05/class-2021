$(document).ready(function(){
  console.log("ready!");

  const $startButton = $("#start");
  const $word = $("#word");
  const $output = $("#output");

  // Words that the user will be guessing
  let words = [
    "illustration",
    "cartooning",
    "animation",
    "film",
    "design"
  ];

  // This is will always return either positive 0.5 or -0.5
  function shuffleWords() {
    return Math.round(Math.random()) - 0.5;
  }
  words = words.sort(shuffleWords);


  // split() puts each letter individually in an array, that will then have
  // an index
  const alphabet = "abcdefghijklmnopqrstuvwxyz".split("");
  let letterLookup = {};
  let lettersToGuess = [];
  let tries = 0;
  let gamesPlayed = 0;
  let gameOn = false;
  let lettersSolved = 0;


  // Make an object of key value pairs where the key is the
  // JS numerical key code
  for(var i = 0; i < alphabet.length; i++) {
    // A's keycode in JS is 65, that's why we +65
    letterLookup[i + 65] = alphabet[i];
  }
  console.log(letterLookup)


  function makeLetter(letter) {

    let letterPlaceholder = $('<div>', {
        "class": "letter",
        "data-letter": letter,
        text: "_"
    }).appendTo($word);

    lettersToGuess.push(letterPlaceholder)

  }

  function makeWord(word) {
    let letters = word.split("");

    for(var i = 0; i < letters.length; i++) {
      makeLetter( letters[i] );
    }

  }

  function startGame() {
    gameOn = true;

    $output.text("Tries: 0");
    $word.html("")

    makeWord( words[gamesPlayed] );
    gamesPlayed++;
  }

  $startButton.click(function(){
    $startButton.hide();
    startGame();
  });

  // We need to keep track of the keys the user presses
  $(document).keyup(function(event) {

    // If the game hasn't started, do nothing
    // The rest of the code will only function if the the gameOn var is set
    // to true
    if( !gameOn ) return;

    // Increment our tries variable every time the user presses a button
    tries++;
    $output.text("Tries: " + tries);

    // We need a way to look up the letters
    // key is the key the user pressed
    let key = letterLookup[ event.which ];
    let totalLetters = lettersToGuess.length;

    for( var i = 0; i < totalLetters; i++ ) {

      let letter = lettersToGuess[i];
      // console.log(letter.attr("data-letter"))

      // If the pressed key is the same as the div.letter's data-letter attribute
      // and the text of the letter doesnt' equal the pressed key
      if ( key == letter.attr("data-letter") && letter.text() != key ) {

        // Set the text of the letter to key if there's a match
        letter.text(key);
        lettersSolved++;

        if( lettersSolved == totalLetters ) {
          // If we're here, the user guessed all the letters
          console.log("Word solved!")

          setTimeout(function(){
            gameOn = false;

            if( gamesPlayed == words.length ){
              // Here we ran out of words
              // Show the player their accuracy
              let accuracy = Math.floor( totalLetters / tries * 100 );
              $word.html("Accuracy: " + accuracy + "%");
            } else {
              // Here we need a new word
              $word.html("Nice job! You guessed the word!");
              // Restart the game!
              setTimeout( startGame, 2000 );
            }

          }, 500);



        }
      }
    }

  });


});
