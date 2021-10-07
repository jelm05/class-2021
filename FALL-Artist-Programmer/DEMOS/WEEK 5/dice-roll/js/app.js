// Creating a page where every time the user hits the "Roll Dice" button,
// the screen randomly updates the two dice. Use the HTML & CSS included
// in the starter code folder to get started. Do NOT modify the HTML or CSS.

// 1) Write the following program:
// * Generate a random number between 1 - 6 inclusive and store to a variable, randomOne
//     * Hint: Look at the Math.random() documentation on MDN for a function that does this
// * Generate a random number between 1 - 6 inclusive and store to a variable, randomTwo
// * Combine 'dice-' and randomOne to form the random class for the first die, `firstDie`
//     * Hint: Take a look at the class set, in index.html, on the elements for the dice
//     * Hint: Take a look at the CSS rules that have .dice-1, .dice-2, etc as their selector
// * Combine 'dice-' and randomTwo to form the random class for the second die, `secondDie`
// * Get the first die by id and update its class to `firstDie`
//     * Hint: document.getElementById to get the die by id
//     * Hint: Use the className property once you have the die, and set it equal to `firstDie`
// * Get the second die by id and update its class to `secondDie`

// 2) Listen for clicks on the `Roll the Dice` button. On click, run the code to
// update the dice on the page using the code from the first part.
//     * Hint: You'll want to wrap the code from the first part in a function.
//     * Hint: What method can you use to select the `Roll the Dice` button based on its id?
//     * Hint: You'll need to use onclick to listen for clicks on the button

// A function to reuse to get an inclusive random number between whatever args are passed
function getRandomNum(min, max) {
  // This is sort of a safety measure to round decimals/floats
  // Round up
  min = Math.ceil(min);
  // Round down
  max = Math.floor(max);

  // We +min at the end to ensure Math.floor() doesn't round to 0
  // Adding 1 to make max inclusive
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

// We wrap the rest of our code in a function so we can call it at once when
// we hear the event listener
function diceRoll() {

  // Use our previously created function to get a random num and store in a variable (twice)
  let randomOne = getRandomNum(1, 6)
  let randomTwo = getRandomNum(1, 6)

  // Combine a string to make a class that we can later apply to our html
  let firstDie = "dice-" + randomOne;
  let secondDie = "dice-" + randomTwo;

  // Finally, get the first and second die and replace their class name with the
  // string that we just combined above
  document.getElementById("first-die").className = firstDie;
  document.getElementById("second-die").className = secondDie;

}

// Store a reference to the button/input element from our html
let button = document.getElementById("roll-dice");

// Add an event listener to the button, in this case a click, to execute our function
// every time a user clicks the button
// https://developer.mozilla.org/en-US/docs/Web/API/EventTarget/addEventListener
button.addEventListener("click", diceRoll)
