import handleFormSubmitLogin from "./login.js";
import logout from "./logout.js";
import handleFormSubmitSignup from "./signup.js";
const logoutButton = document.querySelector(".logout");
const form = document.getElementById("registerForm");
const url = window.location.href;
if (url === "/auth/signup") {
  form.addEventListener("submit", handleFormSubmitSignup);
}
if (url === "/auth/login") {
  form.addEventListener("submit", handleFormSubmitLogin);
}
logout(logoutButton);
