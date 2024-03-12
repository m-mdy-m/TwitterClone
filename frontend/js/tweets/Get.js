import { displayMessage } from "../auth/validation.js";
const msgElm = document.getElementById("msgElm");

// Function to fetch tweets from the server
export async function fetchTweets() {
  try {
    // Make a GET request to fetch tweets
    const response = await axios.get("/tweets");
    console.log("response=>", response);
    // Check if the request was successful
    if (response.data.success) {
      // Display the fetched tweets
      console.log("Fetched tweets:", response.data);
      // Handle displaying tweets on the UI as needed
    } else {
      // Display error message with error-related color
      msgElm.style.display = "block";
      console.log("response=>", response);
      displayMessage(msgElm, response.data.error, "#ff6347"); // Error color
      console.error("Failed to fetch tweets:", response.data.error);
    }
  } catch (error) {
    // Handle errors
    if (error.response && error.response.data && error.response.data.error) {
      // Display error message returned from the server
      msgElm.style.display = "block";
      displayMessage(msgElm, error.response.data.error, "#ffd700");
    } else {
      // Display a generic error message for other errors
      msgElm.style.display = "block";
      displayMessage(
        msgElm,
        "An unexpected error occurred while creating the tweet. Please try again later.",
        "#cc0000"
      );
    }
  }
}
