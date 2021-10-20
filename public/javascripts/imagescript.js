let image = document.querySelector('#imageDisplayRef img');

document.querySelector('#imageDisplayRef').addEventListener("click", (event) => {
    if ((image.getAttribute('class') === null) || (image.getAttribute('class') === "")) {
      image.setAttribute("class", "normal");
    } else {
      image.setAttribute("class", "");
    }
  }
);
