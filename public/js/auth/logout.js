// Import the displayMessage function from the validation module
import { displayMessage, getCSRFHeader } from "../common/handlers.js";
// Get the message element from the DOM
const msgElm = document.getElementById("msgElm");

// Define an asynchronous function to handle the logout process
async function handler(e) {
  // Prevent the default form submission behavior
  e.preventDefault();

  try {
    const header = await getCSRFHeader();
    // Send a POST request to the /auth/logout endpoint with the CSRF token in the headers
    const response = await axios.post("/auth/logout", {}, header);
    console.log("response =>", response);
    // Check if the response is successful
    if (response.status === 200 && response.data.success) {
      // Redirect the user to the login page
      window.location.href = "/auth/login";
      // Remove the 'showWelcomePhoto' flag from localStorage
      localStorage.removeItem("showWelcomePhoto");
      localStorage.removeItem("logged");
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
