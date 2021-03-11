$(document).ready(function(){
  console.log("ready");

  const $startBtn = $("#start");
  const $word = $("#word");
  const $output = $("#output");

  let words = [
    "illustration",
    "cartooning",
    "animation",
    "film",
    "design"
  ];

  let gamesPlayed = 0;
  let gameOn = false;
  let tries = 0;
  let lettersToGuess = [];
  let lettersSolved = 0;

  const alphabet = "abcdefghijklmnopqrstuvwxyz".split("");
  // console.log(alphabet)

  // letterLookup is an object that we can compare the keycode that was pressed
  // to the corresponding letter, and then eventually on to check if that letter
  // is within the word we're guessing
  let letterLookup = {};
  for (var i = 0; i < alphabet.length; i++) {
    letterLookup[i + 65] = alphabet[i];
  }

  // This will always return either positive 0.5 or -0.5
  function shuffleWords() {
    return Math.round( Math.random() )-0.5;
  }

  words = words.sort( shuffleWords );
  // console.log(words)

  // console.log(letterLookup)

  $startBtn.click(function(){
      $startBtn.hide();
      startGame();
  });

  function startGame() {
    console.log("game has started");

    gameOn = true;

    // Keep track of guesses/tries
    $output.text("Tries: 0");
    // Whenever we start a game, make sure there's no HTML content in div#word
    $word.html("");

    makeWord(words[gamesPlayed]);
    gamesPlayed++;
  }

  function makeLetter(letter) {

    let letterPlaceholder = $("<div>", {
      "class": "letter",
      "data-letter": letter,
      text: "_"
    }).appendTo($word);

    // lettersToGuess is a collection of letters that we're going to be
    // checking against the letter  that the user presses
    lettersToGuess.push(letterPlaceholder);

  }

  function makeWord(word) {
    let letters = word.split("");
    // console.log("letters:", letters)

    for(var i = 0; i < letters.length; i++ ) {
      // console.log("i: ", i);
      // console.log("current letter:", letters[i] );
      makeLetter( letters[i] );
    }

  }

  $(document).keyup(function( event ){
    // If gameOn is false, return out of the function and do nothing
    if( !gameOn ) return;

    // If the code reaches here, the game is on
    // If js is registering a keyup, we count that as a try
    tries++;
    $output.text(`Tries: ${tries}`);

    // Look up what letter was pressed on the keyboard according
    // to the key code we capture when the user releases the key
    let key = letterLookup[ event.which ];
    let totalLetters = lettersToGuess.length;

    // If the key that was pressed matches one of the letters inside of our
    // array
    for (var i = 0; i < totalLetters; i++) {
      let letter = lettersToGuess[i];

      // console.log(letter.attr("data-letter"))

      if ( key == letter.attr("data-letter") && letter.text() != key ) {
        // console.log("key: ", key )
        // console.log("letter to check: ", letter.attr("data-letter"))
        // console.log("match!")

        // Set the text of the letter to key if there's a match
        letter.text(key);
        lettersSolved++;

        // If the user has correctly guessed the number of letters that exist
        // then we know, the user has guessed teh whole word
        if( lettersSolved == totalLetters ) {
          console.log("word guessed");

          setTimeout(function(){
            gameOn = false;

            if( gamesPlayed == words.length ) {
              let accuracy = Math.floor( totalLetters / tries * 100 );
              $word.html(`Accuracy: ${accuracy}%`);
            } else {
              $word.html("Nice job! You guessed the word!");
              setTimeout( startGame, 2000 );
            }


          }, 500);

        }
      }

    }
  });




















});
