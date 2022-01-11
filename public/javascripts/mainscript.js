/* !!! CHANGE FILE UPLOAD BUTTON LAYOUT */
const fileButton = document.querySelector('#filebutton');
const fileList = document.querySelector('#fileList');

fileButton.addEventListener('change', updateFile);

function updateFile() {
  let curFiles = fileButton.files;

  while (fileList.firstChild) {
    fileList.removeChild(fileList.firstChild);
  }

  if(!(curFiles.length === 0))  {
    const fileImage = document.createElement('img');
    fileImage.src = "/images/icons8-image-file-64.png";
    fileList.appendChild(fileImage);

    const fileText = document.createElement('p');
    fileText.textContent = curFiles[0].name;
    fileList.appendChild(fileText);
  }
}

/* !!! ONLY SHOW IMAGE WHEN FULLY LOADED */
let displayImages = document.querySelectorAll(".images");

displayImages.forEach(function(image) {
    let tempImage = document.createElement('img');
    tempImage.onload = (() => {
      image.src = tempImage.src;
    });
    tempImage.src = image.dataset.src;
  }
);

/* !!! CALCULATE REMAINING CHARACTERS AND UPDATE LABEL */
const formInput = document.querySelector('#titleInputBox');
const textLabel = document.querySelector('.counterText');
const text = document.querySelector('.counterTextInner');
const maxChar = 20;

formInput.addEventListener('input', updateText);

function updateText() {
  if (formInput.value.length >= 1) {
    textLabel.setAttribute('class', 'counterText');
    charLeft = maxChar - formInput.value.length;
    text.textContent = ((charLeft >= 1) ? charLeft : 0) + " characters remaining";
  } else {
    textLabel.setAttribute('class', 'counterText hidden');
  }
}
