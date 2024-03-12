// Importing handlers from a separate file
import { hideIconOnFocus, showIconOnBlur, updateCharCount } from "./Constants/handlers.js";
import { renderNav } from "./templates/navigation.js";
import { fetchTweets } from "./tweets/Get.js";
import { createTweet } from "./tweets/Post.js";
fetchTweets()
const tweetButton = document.getElementById("tweetButton");
const textarea = document.getElementById("tweetInput");
// Get references to the textarea and the icon element
tweetButton.addEventListener("click", () => createTweet(updateCharCount({ target: textarea })));
// Add event listeners to handle focus and blur events
textarea.addEventListener("focus", hideIconOnFocus);
textarea.addEventListener("blur", showIconOnBlur);
textarea.addEventListener('input',updateCharCount)