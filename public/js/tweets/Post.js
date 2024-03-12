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
      const data = undefined
      // Send a POST request to create the tweet with CSRF token included in the request body
      const response = await axios.post("/tweets", {tweet : data}, {
        headers: {
          "X-CSRF-Token": csrfToken,
        },
      });

      console.log("Tweet created:", response);
    } catch (error) {
       const response = error.response
        msgElm.style.display = "block";
       displayMessage(msgElm,response.data.error,'#fc6736')
    }
  } else {
    // If the tweet data is invalid, display the error message
    msgElm.style.display = "block";
    displayMessage(msgElm, val.message, "#FF0000");
  }
}
