import { tweetCreation } from "../utils/apiOperations.js";
import { hideIconOnFocus, showIconOnBlur, showMessage, updateCharCount } from "../utils/helper.js";
import { getMsgElement } from "../utils/utils.js";

// Get the message element from the DOM
const msgElm = getMsgElement()
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
      tweetCreation(data);
    } catch (error) {
      // Handle errors
      if (error.response && error.response.data && error.response.data.error) {
        // Display error message returned from the server
        showMessage(msgElm, error.response.data.error, "#ffd700");
      } else {
        // Display a generic error message for other errors
        showMessage(
          msgElm,
          "An unexpected error occurred while creating the tweet. Please try again later.",
          "#cc0000"
        );
      }
    }
  } else {
    // If the tweet data is invalid, display the error message
    showMessage(msgElm, val.message, "#FF0000");
  }
}

// Function to handle events related to the tweet text area
export function handleTweetTextAreaEvents(tweetButton) {
  // Check if the tweet button exists
  if (tweetButton) {
    // Get the tweet input element
    const tweetInput = document.getElementById("tweetInput");

    // Event listener for creating a tweet when the button is clicked
    tweetButton.addEventListener("click", () =>
      handleTweetButtonClick(tweetInput)
    );

    // Event listeners to handle focus, blur, input, and keydown events on the tweet input
    tweetInput.addEventListener("focus", hideIconOnFocus);
    tweetInput.addEventListener("blur", showIconOnBlur);
    tweetInput.addEventListener("input", updateCharCount);
    tweetInput.addEventListener("keydown", handleKeyDown);
  }
}

// Function to handle creating a tweet when the button is clicked
function handleTweetButtonClick(tweetInput) {
  // Create a tweet and update character count
  createTweetAndUpdateCharCount(tweetInput);
}

// Function to handle keydown event on the tweet input
function handleKeyDown(event) {
  // Check if Enter key is pressed without Shift key for creating a tweet
  if (event.keyCode === 13 && !event.shiftKey) {
    // Create a tweet and update character count
    createTweetAndUpdateCharCount(event);
  } else {
    // Update character count for other key presses
    updateCharCount(event);
  }
}

// Function to create a tweet and update character count
function createTweetAndUpdateCharCount(eventOrInput) {
  // Create a tweet and update character count based on the event or input
  createTweet(updateCharCount({ target: eventOrInput }));
}
