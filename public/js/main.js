// Importing handlers from a separate file
import { hideIconOnFocus, sendDataToBackend, showIconOnBlur, updateCharCount } from "./Constants/handlers.js";

const tweetButton = document.getElementById("tweetButton");
const textarea = document.getElementById("tweetInput");
// Get references to the textarea and the icon element
tweetButton.addEventListener("click", () => sendDataToBackend(updateCharCount({ target: textarea })));
// Add event listeners to handle focus and blur events
textarea.addEventListener("focus", hideIconOnFocus);
textarea.addEventListener("blur", showIconOnBlur);
textarea.addEventListener('input',updateCharCount)