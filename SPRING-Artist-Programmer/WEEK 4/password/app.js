//
// // console.log("really ready!");
// // console.log("what is console? ", typeof(console) )
//
//
function generatePassword() {
  // All code related to our function goes between the curly brackets
  // console.log("inside generatePassword function");

  let characterSet = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  let lengthOfCharacters = characterSet.length;
  let lengthOfPassword = 20;

  // This is our array that is currently empty, but will store our password
  // after we execute our for loop
  let password = [];

  // for (/* conditionals */) {
  //   /* where we do cool stuff */
  //   /* So long as the conditional is true, continue to do the thing */
  // }

  // console.log( characterSet[50] )

  // ++ means to add 1
  // variable declaration; conditional; update or increment our starting variable
  for ( let start = 0; start < lengthOfPassword; start++ ) {
    // console.log("Position:", start);
    // console.log("Character:", characterSet[start] )
    let randomNum = Math.floor( Math.random() * lengthOfCharacters );
    let character = characterSet.charAt(randomNum)
    // console.log("Character " + character + " is at location " + randomNum)

    password.push(character)

  }

  // Overwriting our variable with a string that joins all of the characters
  // in the array
  password = password.join('');
  console.log(password)

  document.getElementById("password-holder").innerHTML = password;

}

document.getElementById("password-generator").onclick = generatePassword;


// Nothing fires in our function until we invoke it
// generatePassword();

// console.log( typeof(generatePassword) );



// let randomNum = Math.random() * 62;
// let removeDecimal = Math.floor( randomNum );
//
// console.log(randomNum);
// console.log(removeDecimal);
