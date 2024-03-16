import { getPath } from "../utils/utils.js";
import { formHandler } from "./formHandler.js";
const form = document.getElementById("registerForm");
const currentPage = getPath();
// Set the submit URL for the form based on the current page
let submitUrl = null;
if (currentPage === "/auth/signup" || currentPage === "/auth/login") {
  submitUrl = currentPage;
}
// Add event listener to the form with the appropriate form handler
if (submitUrl) {
  formHandler(form, submitUrl);
}
