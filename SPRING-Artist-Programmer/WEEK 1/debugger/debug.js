// This is a JavaScript comment
// This works the same as in HTML, it's just different syntax because it's a different language


// replaceTheWords is the name of our custom function
function consoleTests() {
  console.log("test");
  console.log("did you invoke the function");
  // alert("Function invoked");
}

// A function doesn't execute until we invoke it
consoleTests();


function changeHeader() {

  // var replacementWords = "This cool thing!";
  // var header = document.getElementById("second-header");
  // header.innerHTML = replacementWords;

  document.getElementById("second-header").innerHTML = "Other word";

}

changeHeader();
