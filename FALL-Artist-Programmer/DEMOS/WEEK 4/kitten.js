
function replaceImage() {

  // No comma on the last entry of the array
  let imageUrls = [
    'https://placekitten.com/200/200',
    'https://placekitten.com/200/300',
    'https://placebear.com/200/300',
    'https://placebear.com/300/300'
  ]

  let numOfImages = imageUrls.length;
  let randomNumForIndex = Math.floor( Math.random() * numOfImages );
  let newImageUrl = imageUrls[randomNumForIndex]

  // console.log("html elem", document.getElementById('replace'))
  document.getElementById('replace').src = newImageUrl

}

document.getElementById('new-image').onclick = replaceImage
