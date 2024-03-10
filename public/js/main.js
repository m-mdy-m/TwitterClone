// Importing handlers from a separate file
import { hideIconOnFocus, showIconOnBlur, validateInput } from "./Constants/handlers.js";

// Get references to the textarea and the icon element
const textarea = document.getElementById("tweetInput");
// Add event listeners to handle focus and blur events
textarea.addEventListener("focus", hideIconOnFocus);
textarea.addEventListener("blur", showIconOnBlur);
textarea.addEventListener('keypress',validateInput)