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
// if (validationCount >= 4) {
//   try {
//     // Optionally, reset the form after successful submission
//     form.reset();
//     // Display success message to the user
//     const msgSuccess = document.querySelector(".msg-success");
//     msgSuccess.style.background = "#90EE90";
//     // Parse JSON message and display its contents
//     const message = response.data.message;
//     msgSuccess.innerHTML = message; // Display JSON message
//     window.location.href = "/"; // redirected
//   } catch (error) {
//     const msgErrorServer = document.querySelector(".msg-error-fetch");
//     msgErrorServer.style.background = "#fc6736";
//     msgErrorServer.innerHTML = ""; // Clear previous error messages
//     const h1 = document.createElement("h1");
//     msgErrorServer.appendChild(h1);
//     // Handle error
//     if (error.response) {
//       const errorMessage = error.response.data.error;
//       const formData = error.response.data.validationErrors;
//       h1.innerHTML = errorMessage;
//       if (formData) {
//         // Set form values based on the data received from the server
//         for (const [name, value] of Object.entries(formData)) {
//           const input = form.querySelector(`[name="${name}"]`);
//           if (input) {
//             input.value = value;
//           }
//         }
//       }
//     } else if (error.request) {
//       // The request was made but no response was received
//       h1.innerHTML = "No response received from server";
//     } else {
//       // Something happened in setting up the request that triggered an error
//       h1.innerHTML = "Error occurred during request setup" + error.message;
//     }
//   }
// }
