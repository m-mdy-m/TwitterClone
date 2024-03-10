import { displayMessage } from "../auth/validation.js";

// Get the message element from the DOM
const msgElm = document.getElementById("msgElm");

// Function to create a tweet
export async function createTweet(val) {
  // If the tweet data is valid
  console.log("val=>", val);
  if (val.valid) {
    // Hide the error message element
    msgElm.style.opacity = 0;
    msgElm.style.display = "none";
    // Send a POST request to create the tweet
    try {
      console.log("get req post =>");
      console.log("val.value=>", val.value);
      // Extract CSRF token from hidden input field
      const csrfToken = document.querySelector('input[name="_csrf"]').value;
      // Send a POST request to create the tweet with CSRF token included in headers
      const response = await axios.post("/tweets", val.value, {
        headers: {
          'X-CSRF-Token': csrfToken
        }
      });
      console.log("response =>", response);
    } catch (error) {
      console.log("error =>", error.message);
    }
  } else {
    // If the tweet data is invalid, display the error message
    msgElm.style.display = "block";
    displayMessage(msgElm, val.message, "#FF0000");
  }
}
