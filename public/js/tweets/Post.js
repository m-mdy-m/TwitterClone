import { tweetCreation } from "../utils/apiOperations.js";
import {
  hideIconOnFocus,
  showIconOnBlur,
  showMessage,
  updateCharCount,
} from "../utils/helper.js";
import { getMsgElement } from "../utils/utils.js";

// Get the message element from the DOM
const msgElm = getMsgElement();
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
export function handleTweetTextAreaEvents() {
  // Get the tweet input element
  const tweetInput = document.getElementById("tweetInput");
  // Event listeners to handle focus, blur, input, and keydown events on the tweet input
  tweetInput.addEventListener("focus", hideIconOnFocus);
  tweetInput.addEventListener("blur", showIconOnBlur);
  tweetInput.addEventListener("input", (e) => {
    updateCharCount(e);
    autoResizeHeight();
  });
  tweetInput.addEventListener("keydown", handleKeyDown);
}

export function autoResizeHeight() {
  const tweetInput = document.getElementById("tweetInput");
  const tweet__box = document.getElementById("tweet__box");

  if (tweetInput && tweet__box) {
    tweetInput.style.height = "auto";
    tweetInput.style.height = tweetInput.scrollHeight + "px";

    const minHeight = tweet__box.height;
    const maxHeight = 200;
    const newHeight = Math.min(
      Math.max(tweet__box.scrollHeight, minHeight),
      maxHeight
    );
    tweet__box.style.height = newHeight + "px";
  }
}

function handleKeyDown(event) {
  // Check if Enter key is pressed without Shift key
  if (event.keyCode === 13 && !event.shiftKey) {
    // Prevent the default behavior of Enter key (preventing line break)
    event.preventDefault();
    
    // Call createTweetAndUpdateCharCount directly
    createTweetAndUpdateCharCount(event.target);
  } else {
    // For other key presses, update character count
    updateCharCount(event);
  }
}
// Function to create a tweet and update character count
function createTweetAndUpdateCharCount(eventOrInput) {
  const iconElement = document.getElementById("icon-tweet");
  const iconImg = document.getElementById("icon-tweet-img");
  iconElement.style.opacity = 1;
  iconElement.style.zIndex = 1;
  iconImg.src = "/assets/loading/tadpole.svg";
  // Create a tweet and update character count based on the event or input
  createTweet(updateCharCount({ target: eventOrInput }));
}

