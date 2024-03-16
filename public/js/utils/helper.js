import { getMsgElement } from "./utils";

const msgElm = getMsgElement()
const iconElement = document.getElementById("icon-tweet");
// Function to handle unsuccessful form submission
export function handleNotSuccess(data) {
  // Add error message styling to message element
  msgElm.classList.add("msg-errors");
  // Extract error message from server response data
  const message = data.message;
  // Display error message to the user
  showMessage(msgElm, message, "#944E63");
}
// Function to handle successful form submission
export function handleSuccess(form, message) {
  // Reset the form to clear input fields
  form.reset();
  // Add success message styling to message element
  msgElm.classList.add("msg-errors");
  // Display success message to the user
  showMessage(msgElm, message, "#90EE90");
  // Redirect user to the home page after successful submission
  window.location.href = "/home";
}
// Function to handle server errors
export function handleServerError(form, error) {
  // Add error message styling to message element
  msgElm.classList.add("msg-errors");
  // Clear previous error messages
  msgElm.innerHTML = "";
  // Initialize error message with a default value
  let errorMessage = "An error occurred";
  // Check if the error is a server response error
  if (error.response) {
    // Extract error message from server response data or use default message
    errorMessage = error.response.data.error || errorMessage;
    // Extract form data from server response data, if available
    const formData = error.response.data.validationErrors;
    // Update form values based on server response data, if available
    if (formData) {
      updateFormValues(form, formData);
    }
  } else if (error.request) {
    // Handle cases where no response is received from the server
    errorMessage = "No response received from server";
  }
  // Display error message to the user
  showMessage(msgElm, errorMessage, "#fc6736");
}
// Function to update form values based on server response
export function updateFormValues(form, formData) {
  // Iterate over form data entries
  for (const [name, value] of Object.entries(formData)) {
    // Find input element with matching name attribute
    const input = form.querySelector(`[name="${name}"]`);
    // If input element exists, update its value
    if (input) {
      input.value = value;
    }
  }
}
export function showMessage(element, message, color) {
  element.style.display = "block";
  // Set background color of message element
  element.style.background = color;
  // Set opacity of message element
  element.style.opacity = 1;
  // Set message content of message element
  element.innerHTML = message;
  setTimeout(() => {
    element.style.opacity = 0;
    setTimeout(() => {
      element.style.display = "none";
    }, 1000);
  }, 5000);
  return;
}
// Function to hide the icon when textarea is focused
export function hideIconOnFocus(e) {
  const textarea = e.target;
  iconElement.style.opacity = 0;
  iconElement.style.zIndex = -10;
}

// Function to show the icon when textarea loses focus
export function showIconOnBlur(e) {
  const textarea = e.target;
  iconElement.style.opacity = 1;
  iconElement.style.zIndex = 1;
}