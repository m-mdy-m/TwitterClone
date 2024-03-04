// Function to handle form submission
import { handleFormValidation, validationCount } from "./utils.js";
const form = document.getElementById("registerForm");
handleFormValidation();
export async function handleSubmit(e) {
  e.preventDefault();
  if (validationCount >= 4) {
    try {
      const formData = new FormData(form);
      const requestData = Object.fromEntries(formData.entries());
      const response = await axios.post("/login", requestData);
      handleSuccess(response.data.message);
    } catch (error) {
      handleServerError(error);
    }
  }
}

// Function to handle successful form submission
function handleSuccess(message) {
  form.reset();
  const msgSuccess = document.querySelector(".msg-success");
  displayMessage(msgSuccess, message, "#90EE90");
  window.location.href = "/";
}
// Function to handle server errors
function handleServerError(error) {
  const msgErrorServer = document.querySelector(".msg-error-fetch");
  msgErrorServer.innerHTML = ""; // Clear previous error messages
  let errorMessage = "An error occurred";
  if (error.response) {
    errorMessage = error.response.data.error || errorMessage;
    const formData = error.response.data.validationErrors;
    if (formData) {
      updateFormValues(formData);
    }
  } else if (error.request) {
    errorMessage = "No response received from server";
  }
  displayMessage(msgErrorServer, errorMessage, "#fc6736");
}
// Function to display messages
function displayMessage(element, message, color) {
  element.style.background = color;
  element.innerHTML = message;
}

// Function to update form values based on server response
function updateFormValues(formData) {
  for (const [name, value] of Object.entries(formData)) {
    const input = form.querySelector(`[name="${name}"]`);
    if (input) {
      input.value = value;
    }
  }
}
