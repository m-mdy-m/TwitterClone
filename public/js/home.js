const { formHandler } = require("./auth/formHandler");
const { initializeComponentsNavigation } = require("./nav/navigation-handler");
const { createTweet } = require("./tweets/Post");
const { getTweets } = require("./utils/apiOperations");
const { updateCharCount, hideIconOnFocus, showIconOnBlur } = require("./utils/helper");
const { getPath, isAuth } = require("./utils/utils");

const path = getPath();
document.addEventListener("DOMContentLoaded", async ()=>{
    initializeComponentsNavigation()
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
        await getTweets();
    }else{
        const form = document.getElementById("registerForm");
        formHandler(form,path)
    }
});


