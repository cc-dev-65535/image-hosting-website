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

const images = document.querySelectorAll(".imgContainer");

for (let containerNode of images) {
  let imageNode = containerNode.children[0].children[0];
  let scaledWidth = imageNode.naturalWidth * 0.30;
  let scaledHeight = imageNode.naturalHeight * 0.30;
  containerNode.width = scaledWidth;
  containerNode.height = scaledHeight;
}
