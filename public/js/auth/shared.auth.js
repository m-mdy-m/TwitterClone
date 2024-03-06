import { formHandler, getUrl } from "./formHandler.js";
const form = document.getElementById("registerForm");
const url = window.location.href;
console.log("url =>", url);
// Define event handlers for login and signup forms using the formHandler function
if (url === "/auth/signup") {
  getUrl(url); // Set the submitUrl for signup
  form.addEventListener("submit", formHandler);
}
if (url === "/auth/login") {
  getUrl(url); // Set the submitUrl for login
  form.addEventListener("submit", formHandler);
}
