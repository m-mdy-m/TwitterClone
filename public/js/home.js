import { formHandler } from "./auth/formHandler.js";
import Header from "./components/common/header.js";
import { initializeComponentsNavigation } from "./nav/navigation-handler.js";
import { handleTweetTextAreaEvents } from "./tweets/Post.js";
import { listMenuTweet, showUserRetweeted } from "./tweets/helperTweet.js";
import { getTweets, getUserInfo } from "./utils/apiOperations.js";
import { getPath, isAuth } from "./utils/utils.js";

const path = getPath();
// Show loader when the page is loading
const loader = document.getElementById("loader");
document.addEventListener("DOMContentLoaded", async () => {
  loader.style.display = "none";
  // Check if the user is authenticated and the tweet button exists
  if (isAuth()) {
    if ("/home".includes(path)) {
      handleTweetTextAreaEvents();
    }
    const header = document.querySelector("header");
    const { username, profilePic } = await getUserInfo();
    header.innerHTML = Header({ profile: profilePic, username });
    initializeComponentsNavigation();
  }
  // Fetch tweets if the path is not /auth/signup or /auth/login
  if (!["/auth/signup", "/auth/login"].includes(path)) {
    await getTweets();
    showUserRetweeted();
    listMenuTweet();
  } else {
    const form = document.getElementById("registerForm");
    formHandler(form, path);
  }
});
