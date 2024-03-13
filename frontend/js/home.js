// Importing handlers from a separate file
import { fetchTweets } from "./common/helper.js";
import { hideIconOnFocus, showIconOnBlur, updateCharCount } from "./common/handlers.js";
import { createTweet } from "./tweets/Post.js";
console.log('hi');
fetchTweets()
const tweetButton = document.getElementById("tweetButton");
const textarea = document.getElementById("tweetInput");
// Get references to the textarea and the icon element
tweetButton.addEventListener("click", () => createTweet(updateCharCount({ target: textarea })));
// Add event listeners to handle focus and blur events
textarea.addEventListener("focus", hideIconOnFocus);
textarea.addEventListener("blur", showIconOnBlur);
textarea.addEventListener('input',updateCharCount)