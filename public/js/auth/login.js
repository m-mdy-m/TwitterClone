import { handleSubmit } from "./validation.js";
const form = document.getElementById("registerForm");
// Define a wrapper function to dynamically pass the submit URL to handleSubmit
function login(event) {
  // Replace 'submitUrl' with the dynamic URL you want to use
  const submitUrl = "/auth/login";
  handleSubmit(event, submitUrl);
}

// Add event listener to the form using the wrapper function
form.addEventListener("submit", login);
export default login;
