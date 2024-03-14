// Importing handlers from a separate file
import { fetchTweets } from "./common/fetchTweet.js";
import { hideIconOnFocus, showIconOnBlur, updateCharCount } from "./common/handlers.js";
import { createTweet } from "./tweets/Post.js";
import { onDocumentLoad } from "./nav/navigation-handler.js";
import { iconsHandler } from "./tweets/tweetHandlers.js";
// Execute onDocumentLoad function when the document is loaded
document.addEventListener("DOMContentLoaded", async ()=>{
    onDocumentLoad()
    await fetchTweets()
    iconsHandler()
});
const tweetButton = document.getElementById("tweetButton");
const textarea = document.getElementById("tweetInput");
// Get references to the textarea and the icon element
tweetButton.addEventListener("click", () => createTweet(updateCharCount({ target: textarea })));
// Add event listeners to handle focus and blur events
textarea.addEventListener("focus", hideIconOnFocus);
textarea.addEventListener("blur", showIconOnBlur);
textarea.addEventListener('input',updateCharCount)