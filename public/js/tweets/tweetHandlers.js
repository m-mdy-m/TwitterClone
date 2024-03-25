import Tweet from "../components/Tweet.js";
import { showMessage } from "../utils/helper.js";
import {
  calculateLikeCount,
  getCurrentTimeFormatted,
  getMsgElement,
} from "../utils/utils.js";
import { handleClick } from "./Like.js";
const wrapper = document.getElementById("wrapperTweet");
const msgELm = getMsgElement();

// Function to add a single tweet to the UI
export function AddTweet(tweetData, userInfo,authorData='') {
  try {
    // Render the tweet template
    const tweetTemplate = renderTweet(tweetData, userInfo,authorData);
    // Append the rendered tweet template to the wrapper element
    appendTweet("afterbegin", tweetTemplate);

    attachIconClickListeners();
    // Clear the tweet input field after adding the tweet
    clearTweetInput();
  } catch (error) {
    // Display a generic error message for adding tweet failure
    showMessage(msgELm, "Error adding tweet. Please try again.", "#ff6347");
  }
}

// Function to show multiple tweets in the UI
export function ShowTweets(response, userInfo,author='') {
  try {
    // Ensure the response contains tweet data
    if (!response || !response.data || !response.data.tweets) {
      // Display an error message if the response data is invalid
      showMessage(msgELm, "Error: Invalid response data.", "#ff6347");
      return;
    }
    // Extract tweets array from the response
    let tweets = response.data.tweets;
    // Sort the tweets array by createdAt in descending order (newest to oldest)
    tweets.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    // Iterate over each tweet and render its template
    tweets.forEach((tweet) => {
      const tweetTemplate = renderTweet(tweet, userInfo,author);

      // Append the rendered tweet template to the wrapper element
      appendTweet("beforeend", tweetTemplate);
    });
    // Clear the tweet input field after showing tweets
    clearTweetInput();
  } catch (error) {
    // Display a generic error message for showing tweets failure
    showMessage(msgELm, "Error showing tweets. Please try again.", "#ff6347");
  }
}

function renderTweet(tweet, userInfo, author = '') {
  if (!tweet || !userInfo) {
    showMessage(msgELm, "Error: Invalid tweet or user information.", "#ff6347");
    return null;
  }

  try {
    const { content, createdAt, _id, likes, author: tweetAuthor, retweeters } = tweet;
    const { userId } = userInfo;
    const isLiked = likes.includes(userId);
    let isRetweeted = (retweeters.includes(userId) && author);
    const likeIcon = isLiked ? "nav/heart-full.svg" : "nav/heart-null.svg";
    const retweetedIcon = isRetweeted ? "nav/retweeted-icon.svg" : "nav/ReTweet.svg";
    const retweetCount = retweeters.length !==0 ? retweeters.length : '' ;
    const formattedCreatedAt = getCurrentTimeFormatted(createdAt);
    const classname =  (author && tweet.originalTweet)? 'flex' : 'hidden'
    console.log('tweet=>',tweet);
    console.log('retweeters=>',retweeters);
    console.log('retweetCount=>',retweetCount);
    console.log('retweetedIcon=>',retweetedIcon);
    console.log('author=>',author);
    let  tweetContent = {
      username: tweetAuthor.username,
      profile: tweetAuthor.profilePic ,
      content,
      createdAt: formattedCreatedAt,
      id: _id,
      likeCount: calculateLikeCount(tweet),
      srcLikeIcon: likeIcon,
      retweetedUsername: author.username,
      retweetCount,
      isRetweeted: classname,
      srcRetweetIcon: retweetedIcon,
    }
    return Tweet(tweetContent)
    
  } catch (error) {
    console.log(error);
    showMessage(msgELm, "Error rendering tweet. Please try again.", "#ff6347");
    return null;
  }
}


// Function to append a tweet template to the UI
function appendTweet(position, tweetTemplate) {
  // Append the tweet template HTML to the wrapper element
  wrapper.insertAdjacentHTML(position, tweetTemplate);
}

// Function to clear the tweet input field
function clearTweetInput() {
  // Clear the value of the tweet input field
  document.getElementById("tweetInput").value = "";
}

// Attaches click event listeners to all elements with the class "icons".
export function attachIconClickListeners() {
  try {
    // Select all elements with the class "icons"
    const icons = document.querySelectorAll(".icons");

    // Check if any icons are found
    if (!icons || icons.length === 0) {
      // Display an error message if no icons are found
      showMessage(msgELm, "No icons found.", "#ff6347");
      return;
    }

    // Attach a click event listener to each icon
    icons.forEach((icon) => {
      icon.addEventListener("click", handleClick);
    });
  } catch (error) {
    // Display a generic error message for attaching icon click listeners
    showMessage(
      msgELm,
      "Error attaching icon click listeners. Please try again.",
      "#ff6347"
    );
  }
}
