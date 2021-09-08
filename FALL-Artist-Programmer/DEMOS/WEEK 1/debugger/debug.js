// This is a JavaScript comment
// This works the same as in HTML, it's just different syntax because it's a different language

// console.log("My name is Justin.");
// console.log('Quotes dont matter so long as theyre consistent');

// replaceTheWords is the name of our custom function
function consoleTests() {
  console.log("test");
  console.log("did you invoke the function");
  // alert("Function invoked");
}

// A function doesn't execute until we invoke it
// consoleTests();

// sayName is what we've named our function,
// we want to name our functions logically

// name is our parameter
function sayName(name) {
  console.log("My name is", name);
}

// This is a variable, it's where we store pieces of information
// current_name is the name of our variable
let current_name = "Justin E"

// We pass our variable as an argument to our function
sayName(current_name);



// let elem = document.getElementById("second-header")
// console.log("elem", elem)

// document.getElementById("second-header").innerHTML = "change this";

function changeHeader() {

  // var replacementWords = "This cool thing!";
  // var header = document.getElementById("second-header");
  // header.innerHTML = replacementWords;
  console.log("change header function was invoked")
  document.getElementById("second-header").innerHTML = "Change on event";

}

let button = document.getElementById("cool-button")
button.onclick = changeHeader

// changeHeader();



let typeNum = 23425
console.log(typeof(typeNum))

let typeString = "string"
console.log(typeof(typeString))
