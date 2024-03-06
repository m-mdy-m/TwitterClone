import { formHandler, getUrl } from "./formHandler.js";
import logout from "./logout.js";
const form = document.getElementById("registerForm");
const btnLogout = document.querySelector('.logout')
logout(btnLogout)
const url = window.location.href;
const baseUrl = new URL(url).origin;
// Define event handlers for login and signup forms using the formHandler function
if (url === baseUrl + "/auth/signup") {
  getUrl(url); // Set the submitUrl for signup
  form.addEventListener("submit", formHandler);
}
if (url === baseUrl + "/auth/login") {
  getUrl(url); // Set the submitUrl for login
  form.addEventListener("submit", formHandler);
}
