import { getPath } from "../utils/utils.js";
import { formHandler, getUrl } from "./formHandler.js";
document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("registerForm");
  const currentPage = getPath()
  // Define event handlers for login and signup forms using the formHandler function
  if (currentPage === "/auth/signup") {
    getUrl(currentPage); // Set the submitUrl for signup
    form.addEventListener("submit", formHandler);
  }
  if (currentPage === "/auth/login") {
    getUrl(currentPage); // Set the submitUrl for login
    form.addEventListener("submit", formHandler);
  }
});
