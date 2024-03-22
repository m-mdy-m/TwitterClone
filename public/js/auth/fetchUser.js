// Function to handle form submission
import {authenticateUser  } from "../utils/apiOperations.js";
import { getAuthHeaders, handleNotSuccess, handleServerError } from "../utils/helper.js";
import { handleFormValidation, validationCount } from "./validation.js";
const form = document.getElementById("registerForm");
handleFormValidation();
export async function handleSubmit(e, submitUrl) {
  e.preventDefault();
  // Ensure that form validation count meets the required threshold
  if (validationCount >= 3) {
    const button = e.submitter
    const oldValue = button.innerHTML
    const img = document.createElement('img')
    img.src = '/assets/loading/gooey-balls.svg'
    button.innerHTML =''
    button.appendChild(img)
    try {
      const headers  = await getAuthHeaders()
      // Collect form data
      const formData = new FormData(form);
      // Convert form data to object
      const requestData = Object.fromEntries(formData.entries());
      // Send form data to the server via POST request
      authenticateUser(submitUrl,requestData,headers,form)
      button.innerHTML = oldValue
    } catch (error) {
      // Handle any errors that occur during the form submission process
      handleServerError(form,error);
    }
  }else{
     // If validation count is less than 3, display error message
     handleNotSuccess({ message: "Please complete the form correctly." });
  }
}

