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

function computeLayout() {
  const images = document.querySelectorAll(".imgContainer");

  for (let containerNode of Array.from(images)) {
    let imageNode = containerNode.childNodes[0].childNodes[0];
    imageNode.addEventListener("load", () => {
      let scaledWidth = imageNode.naturalWidth * 0.30;
      let scaledHeight = imageNode.naturalHeight * 0.30;
      containerNode.setAttribute('style', `width: ${scaledWidth}px; height: ${scaledHeight}px`);
      containerNode.setAttribute('class', "imgContainer");
    });
  }
}

computeLayout();
