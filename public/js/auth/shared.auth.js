import formHandler from './formHandler.js'
const logoutButton = document.querySelector(".logout");
const form = document.getElementById("registerForm");
const url = window.location.href;
// Define event handlers for login and signup forms using the formHandler function
if (url === "/auth/signup") {
  form.addEventListener("submit", (event) => formHandler(event, "/auth/signup"));
}
if (url === "/auth/login") {
  form.addEventListener("submit", (event) => formHandler(event, "/auth/login"));
}
