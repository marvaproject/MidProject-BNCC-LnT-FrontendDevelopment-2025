// Header background
const header = document.querySelector("header");

const scrollHeader = () => {
  if (window.scrollY > 1) {
    header.classList.add("scrolled");
  } else {
    header.classList.remove("scrolled");
  }
};

scrollHeader();

window.addEventListener("scroll", scrollHeader);