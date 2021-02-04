

function replaceImage() {

  let imageURLs = [
    'https://placekitten.com/200/200',
    'https://placekitten.com/200/300',
    'https://placebear.com/200/300',
    'https://placebear.com/300/300'
  ];

  // Get a random whole number between 0 and 3
  let randomNum = Math.floor( Math.random() * 4 );
  console.log(randomNum)

  let newImageURL = imageURLs[randomNum];
  console.log(newImageURL);

  document.getElementById("replace").src = newImageURL;

}

document.getElementById("new-image").onclick = replaceImage;
