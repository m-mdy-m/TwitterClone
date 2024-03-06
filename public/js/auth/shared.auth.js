import formHandler from "./formHandler.js";
const logoutButton = document.querySelector(".logout");
const form = document.getElementById("registerForm");
const url = window.location.href;
console.log("url =>", url);
// Define event handlers for login and signup forms using the formHandler function
if (url === "/auth/signup") {
  form.addEventListener("submit", (event) => formHandler(event, url));
}
if (url === "/auth/login") {
  form.addEventListener("submit", (event) => formHandler(event, url));
}
