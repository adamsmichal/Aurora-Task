const menuButton = document.querySelector(".mid-bar__burger-input");
const nav = document.querySelector(".nav");

const showMenu = () => {
  if (menuButton.checked) {
    nav.style.width = "100%";
  } else {
    nav.style.width = "";
  }
};

menuButton.addEventListener("click", showMenu, false);
