// Header background
const headerModule = {
  init: function () {
    this.scrollHeader();
  },
  scrollHeader: function () {
    const header = document.querySelector("header");
    const scrollPos = window.scrollY;

    if (scrollPos > 1) {
      header.classList.add("scrolled");
    } else {
      header.classList.remove("scrolled");
    }

    window.addEventListener("scroll", this.scrollHeader);
  },
};

headerModule.init();