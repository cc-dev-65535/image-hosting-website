/* ADD EXPAND IMAGE FUNCTIONALITY */
let image = document.querySelector('.singleImage');
let thumbImageSrc = image.src;
let imageSrc = image.dataset.src;

image.addEventListener("click", (event) => {
    if (image.src === thumbImageSrc) {
      image.src = imageSrc;
    } else {
      image.src = thumbImageSrc;
    }
  }
);
