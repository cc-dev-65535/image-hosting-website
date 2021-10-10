/*
getImages();

async function getImages() {
  const path = "/uploads/";
  const response = await fetch("http://localhost:3000/api/images");
  const data = await response.json();
  //TODO: rest api response error handling

  data.reverse();
  data.forEach(item => {
    const srcPath = path + item.uri;
    displayImage(srcPath, item.uri);
  });
}

function displayImage(imageSrc, filename) {
  const linkNode = document.createElement('a');
  const imgNode = document.createElement('img');
  imgNode.src = imageSrc;
  linkNode.href = "/image/" + filename;
  linkNode.appendChild(imgNode);
  document.querySelector('#imagedisplay').appendChild(linkNode);
}
*/
