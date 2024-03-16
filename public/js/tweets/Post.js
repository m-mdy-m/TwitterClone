import { fetchCreateTweet } from "../common/fetchTweet.js";
import { displayMessage } from "../common/handlers.js";
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
      const data = {
        tweet: val.value,
      };
      /// fetch and send data to server
      fetchCreateTweet(data);
    } catch (error) {
      // Handle errors
      if (error.response && error.response.data && error.response.data.error) {
        // Display error message returned from the server
        displayMessage(msgElm, error.response.data.error, "#ffd700");
      } else {
        // Display a generic error message for other errors
        displayMessage(
          msgElm,
          "An unexpected error occurred while creating the tweet. Please try again later.",
          "#cc0000"
        );
      }
    }
  } else {
    // If the tweet data is invalid, display the error message
    displayMessage(msgElm, val.message, "#FF0000");
  }
}
