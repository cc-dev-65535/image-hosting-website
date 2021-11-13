let image = document.querySelector('#singleImage');
let thumbImageSrc = image.getAttribute('src');
let imageSrc = image.getAttribute('data-src');

image.addEventListener("click", (event) => {
    if (image.getAttribute('src') === thumbImageSrc) {
      image.setAttribute("src", imageSrc);
    } else {
      image.setAttribute("src", thumbImageSrc);
    }
  }
);
