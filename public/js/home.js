import { fetchTweets } from "./common/fetchTweet.js";
import { hideIconOnFocus, showIconOnBlur, updateCharCount } from "./common/handlers.js";
import { onDocumentLoad } from "./nav/navigation-handler.js";
import { createTweet } from "./tweets/Post.js";
import { iconsHandler } from "./tweets/tweetHandlers.js";
document.addEventListener("DOMContentLoaded", async ()=>{
    onDocumentLoad()
    const tweetButton = document.getElementById("tweetButton");
    const textarea = document.getElementById("tweetInput");
    // Get references to the textarea and the icon element
    tweetButton.addEventListener("click", () => createTweet(updateCharCount({ target: textarea })));
    // Add event listeners to handle focus and blur events
    textarea.addEventListener("focus", hideIconOnFocus);
    textarea.addEventListener("blur", showIconOnBlur);
    textarea.addEventListener('input',updateCharCount)
    await fetchTweets()
});


