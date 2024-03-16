import { fetchTweets } from "./common/fetchTweet.js";
import {
  hideIconOnFocus,
  showIconOnBlur,
  updateCharCount,
} from "./common/handlers.js";
import { onDocumentLoad } from "./nav/navigation-handler.js";
import { createTweet } from "./tweets/Post.js";
const isAuth = localStorage.getItem("logged");
const path = window.location.pathname;
document.addEventListener("DOMContentLoaded", async () => {
  onDocumentLoad();
  const tweetButton = document.getElementById("tweetButton");
  if (isAuth && tweetButton) {
    const textarea = document.getElementById("tweetInput");
    // Get references to the textarea and the icon element
    tweetButton.addEventListener("click", () =>
      createTweet(updateCharCount({ target: textarea }))
    );
    // Add event listeners to handle focus and blur events
    textarea.addEventListener("focus", hideIconOnFocus);
    textarea.addEventListener("blur", showIconOnBlur);
    textarea.addEventListener("input", updateCharCount);
  }
  if (path !== "/auth/signup" && path !== "/auth/login") {
    await fetchTweets();
  }
});
