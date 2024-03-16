// Function to handle form submission
import {displayMessage, getCSRFHeader} from "../common/handlers.js";
import Header from "../components/common/header.js";
import { handleFormValidation, validationCount } from "./utils.js";
const form = document.getElementById("registerForm");
const msgElm = document.getElementById("msgElm");
handleFormValidation();
export async function handleSubmit(e, submitUrl) {
  e.preventDefault();
  // Ensure that form validation count meets the required threshold
  if (validationCount >= 3) {
    try {
      const headers  = await getCSRFHeader()
      // Collect form data
      const formData = new FormData(form);
      // Convert form data to object
      const requestData = Object.fromEntries(formData.entries());
      // Send form data to the server via POST request
      const response = await axios.post(submitUrl, requestData, headers);
      // Handle server response based on success or failure
      if (response.data.success) {
        const user = response.data.data
        // If the server indicates success, handle accordingly
        handleSuccess(response.data.message);
        // Set the 'showWelcomePhoto' flag to 'true' in localStorage
        localStorage.setItem("showWelcomePhoto", response.data.success);
        localStorage.setItem("logged", response.data.success);
      } else {
        // If the server indicates failure, handle accordingly
        handleNotSuccess(response.data);
      }
    } catch (error) {
      // Handle any errors that occur during the form submission process
      handleServerError(error);
    }
  }else{
     // If validation count is less than 3, display error message
     handleNotSuccess({ message: "Please complete the form correctly." });
  }
}
// Function to handle unsuccessful form submission
function handleNotSuccess(data) {
  // Add error message styling to message element
  msgElm.classList.add("msg-errors");
  // Extract error message from server response data
  const message = data.message;
  // Display error message to the user
  displayMessage(msgElm, message, "#944E63");
}
// Function to handle successful form submission
function handleSuccess(message) {
  // Reset the form to clear input fields
  form.reset();
  // Add success message styling to message element
  msgElm.classList.add("msg-errors");
  // Display success message to the user
  displayMessage(msgElm, message, "#90EE90");
  // Redirect user to the home page after successful submission
  window.location.href = "/home";
}
// Function to handle server errors
function handleServerError(error) {
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
      updateFormValues(formData);
    }
  } else if (error.request) {
    // Handle cases where no response is received from the server
    errorMessage = "No response received from server";
  }
  // Display error message to the user
  displayMessage(msgElm, errorMessage, "#fc6736");
}

// Function to update form values based on server response
function updateFormValues(formData) {
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
