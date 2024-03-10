import { displayMessage } from "../auth/validation.js";
import getCSRFToken from "../Constants/getCSRFToken.js";
// Get the message element from the DOM
const msgElm = document.getElementById("msgElm");

// Function to create a tweet
export async function createTweet(val) {
  // If the tweet data is valid
  if (val.valid) {
    // Hide the error message element
    msgElm.style.opacity = 0;
    msgElm.style.display = "none";
    // Send a POST request to create the tweet
    try {
      // Fetch CSRF token
      const csrfToken = await getCSRFToken();
      if (!csrfToken) {
        throw new Error("CSRF token is missing");
      }
      // Send a POST request to create the tweet with CSRF token included in headers
      const response = await axios.post("/tweets", val.value, {
        headers: {
          "Content-Type": "application/json",
          "X-CSRF-Token": csrfToken,
        },
      });
      console.log("Tweet created:", response);
    } catch (error) {
      console.log("Error creating tweet:", error.message);
    }
  } else {
    // If the tweet data is invalid, display the error message
    msgElm.style.display = "block";
    displayMessage(msgElm, val.message, "#FF0000");
  }
}
