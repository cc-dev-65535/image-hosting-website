let image = document.querySelector('#singleImage');

image.addEventListener("click", (event) => {
    if ((image.getAttribute('class') === null) || (image.getAttribute('class') === "")) {
      image.setAttribute("class", "normal");
    } else {
      image.setAttribute("class", "");
    }
    event.preventDefault();
  }
);
