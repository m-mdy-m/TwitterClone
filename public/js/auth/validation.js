// Function to handle form submission
import { handleFormValidation, validationCount } from "./utils.js";
const form = document.getElementById("registerForm");
const msgElm = document.getElementById("msgElm");
handleFormValidation();
export async function handleSubmit(e, submitUrl) {
  e.preventDefault();
  if (validationCount >= 4) {
    try {
      const formData = new FormData(form);
      const requestData = Object.fromEntries(formData.entries());
      const response = await axios.post(submitUrl, requestData);
      if (response.data.success) {
        handleSuccess(response.data.message);
      } else {
        handleNotSuccess(response.data);
      }
    } catch (error) {
      handleServerError(error);
    }
  }
}
function handleNotSuccess(data) {
  msgElm.classList.add("msg-failedLogin");
  const message = data.message;
  displayMessage(msgElm, message, "#944E63"); // Clear previous error messages
}
// Function to handle successful form submission
function handleSuccess(message) {
  form.reset();
  msgElm.classList.add("msg-success");
  displayMessage(msgElm, message, "#90EE90");
  window.location.href = "/";
}
// Function to handle server errors
function handleServerError(error) {
  msgElm.classList.add("msg-success");
  msgElm.innerHTML = ""; // Clear previous error messages
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
  displayMessage(msgElm, errorMessage, "#fc6736");
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
