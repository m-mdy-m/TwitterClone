// Import the displayMessage function from the validation module
import { displayMessage } from "./validation.js";

// Get the message element from the DOM
const msgElm = document.getElementById("msgElm");

// Define an asynchronous function to handle the logout process
async function handler(e) {
  // Prevent the default form submission behavior
  e.preventDefault();

  try {
    // Fetch the CSRF token from a hidden input field in the HTML
    const csrfToken = document.querySelector('input[name="_csrf"]').value;
    
    // Include the CSRF token in the request headers
    const headers = {
      "X-CSRF-TOKEN": csrfToken,
    };

    // Send a POST request to the /auth/logout endpoint with the CSRF token in the headers
    const response = await axios.post("/auth/logout", {}, { headers });

    // Check if the response is successful
    if (response.status === 200 && response.data.success) {
      // Redirect the user to the login page
      window.location.href = "/auth/login";
      // Remove the 'showWelcomePhoto' flag from localStorage
      localStorage.removeItem("showWelcomePhoto");
    } else {
      // If the logout process fails, display an error message
      msgElm.classList.add("msg-errors");
      const message = response.data.message;
      displayMessage(msgElm, message, "#944E63");
    }
  } catch (error) {
    // If an error occurs during the logout process, display an error message
    msgElm.classList.add("msg-errors");
    msgElm.innerHTML = "";
    const message = error.response
      ? error.response.data.error
      : "An error occurred";
    displayMessage(msgElm, message, "#fc6736");
  }
}

// Function to attach the logout handler to a button element
function logout(button) {
  if (button) {
    // Add a click event listener to the button that triggers the logout handler
    button.addEventListener("click", handler);
  }
}

// Export the logout function to make it accessible to other modules
export default logout;
