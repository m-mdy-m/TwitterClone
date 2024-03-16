import { formHandler } from "./auth/formHandler.js";
import { isAuth } from "./common/Storage.js";
import { fetchTweets } from "./common/fetchTweet.js";
import { hideIconOnFocus, showIconOnBlur, updateCharCount } from "./common/handlers.js";
import { onDocumentLoad } from "./nav/navigation-handler.js";
import { createTweet } from "./tweets/Post.js";
import { getPath } from "./utils/utils.js";
const path = getPath();
document.addEventListener("DOMContentLoaded", async ()=>{
    onDocumentLoad()
    // Check if the user is authenticated and the tweet button exists
    if (isAuth()) {
        const tweetButton = document.getElementById("tweetButton");
        if (tweetButton) {
            const textarea = document.getElementById("tweetInput");
            // Add event listener for creating a tweet
            tweetButton.addEventListener("click", () => createTweet(updateCharCount({ target: textarea })));
            // Add event listeners to handle focus, blur, and input events
            textarea.addEventListener("focus", hideIconOnFocus);
            textarea.addEventListener("blur", showIconOnBlur);
            textarea.addEventListener('input', updateCharCount);
        }
    }
    // Fetch tweets if the path is not /auth/signup or /auth/login
    if (!['/auth/signup', '/auth/login'].includes(path)) {
        await fetchTweets();
    }else{
        const form = document.getElementById("registerForm");
        formHandler(form,path)
    }
});


