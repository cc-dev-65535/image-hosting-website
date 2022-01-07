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

var displayImages = document.querySelectorAll(".images");

displayImages.forEach(function(image) {
    let tempImage = document.createElement('img');
    tempImage.onload = (() => {
      image.src = tempImage.src;
    });
    tempImage.src = image.dataset.src;
  }
);
