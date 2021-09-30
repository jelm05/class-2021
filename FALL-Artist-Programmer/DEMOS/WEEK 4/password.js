
// We want to generate a password
// We need to have a generic list of characters to choose from
// We need a certain amount of randomness involved
// We need to be able to repeatedly generate passwords (prob function)
// And we need to output whatever was generated to the browser

function generatePassword() {

  let characterSet = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ123456789!@#$%&^*+";
  let characterSetLength = characterSet.length
  let lengthOfPassword = 20;
  let password = [];
  // console.log("Math:", Math)

  // Set a counter, start at 0, so long as our counter is less than the length of
  // our characterSet array, increase the count by one, and do something
  for (var count = 0; count < lengthOfPassword; count++) {
    // This will generate a random number 0 to whatever the multiplier is
    let random = Math.floor( Math.random() * characterSetLength );

    // Pushing a character into the array
    password.push(characterSet[random])
  }

  console.log("before join", password)

  // combine all the characters in our array into one string
  password = password.join('');
  console.log("after join", password)

  // Overwrite the inner html of that element with our
  // generated password
  document.getElementById("password-holder").innerHTML = password

} // this is the end of my function

// Look at the document, whenever the password-generator button
// is click, invoke the generatePassword function
// This is called an event handler
// the event is the click
document.getElementById("password-generator").onclick = generatePassword
