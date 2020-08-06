const menuButton = document.querySelector(".mid-bar__burger-input");
const searchButton = document.querySelector(".mid-bar__icon-container");
const exitButton = document.querySelector(".mid-bar__form-exit");
const nav = document.querySelector(".nav");
const mobileForm = document.querySelector(".mid-bar__form-field");
const mobileFormInput = document.querySelector(".mid-bar__form-input");

const showMenu = () => {
  if (menuButton.checked) {
    nav.style.width = "100%";
  } else {
    nav.style.width = "";
  }
};

const showMobileForm = () => {
  mobileForm.style.height = "30vh";
  mobileForm.style.padding = "30px";
  mobileFormInput.style.display = "block";
  exitButton.style.display = "block";
};

const closeMobileForm = () => {
  mobileForm.style.height = "";
  mobileForm.style.padding = "";
  mobileFormInput.style.display = "";
  exitButton.style.display = "";
};

menuButton.addEventListener("click", showMenu, false);
searchButton.addEventListener("click", showMobileForm, false);
exitButton.addEventListener("click", closeMobileForm, false);
