import Tweet from "../components/Tweet.js";
import { showMessage } from "../utils/helper.js";
import {
  calculateLikeCount,
  getCurrentTimeFormatted,
  getMsgElement,
} from "../utils/utils.js";
import { handleClick } from "./Like.js";
import { listMenuTweet, showUserRetweeted } from "./helperTweet.js";
const wrapper = document.getElementById("wrapperTweet");
const msgELm = getMsgElement();

// Function to add a single tweet to the UI
export function AddTweet(
  tweetData,
  userInfo,
  authorData = "",
  originalTweet = null
) {
  try {
    // Render the tweet template
    const tweetTemplate = renderTweet(
      tweetData,
      userInfo,
      authorData,
      originalTweet
    );
    // Append the rendered tweet template to the wrapper element
    appendTweet("afterbegin", tweetTemplate);

    attachIconClickListeners();
    showUserRetweeted();
    listMenuTweet();
    // Clear the tweet input field after adding the tweet
    clearTweetInput();
  } catch (error) {
    console.log("error =>", error);
    // Display a generic error message for adding tweet failure
    showMessage(msgELm, "Error adding tweet. Please try again.", "#ff6347");
  }
}

// Function to show multiple tweets in the UI
export function ShowTweets(response, userInfo, author = "") {
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
      const tweetTemplate = renderTweet(tweet, userInfo, author);

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

function renderTweet(tweet, userInfo, author = "", originalTweet = null) {

  console.log('tweet:'+tweet);
  console.log('userInfo:'+userInfo);
  console.log('author:'+author);
  console.log('originalTweet:'+originalTweet);

  if (!tweet || !userInfo) {
    showMessage(msgELm, "Error: Invalid tweet or user information.", "#ff6347");
    return null;
  }
  try {
    /// extract tweet 
    const { content, createdAt, _id,likes,author: tweetAuthor, retweeters, } = tweet;
    // extract current user
    const { userId } = userInfo;
    // current user is liked ?
    const isLiked = likes.includes(userId);
    // if current user retweeted 
    let isRetweeted = originalTweet? originalTweet.retweeters.includes(userId): retweeters.includes(userId) && author;
    // icon liked
    const likeIcon = isLiked ? "nav/heart-full.svg" : "nav/heart-null.svg";
    // icon retweeted
    const retweetedIcon = isRetweeted ? "nav/retweeted-icon.svg": "nav/ReTweet.svg";
    // count retweeted post 
    const retweetCount = originalTweet ? originalTweet.retweeters && originalTweet.retweeters.length > 0 ? originalTweet.retweeters.length: "": retweeters && retweeters.length > 0? retweeters.length: "";
    // time create post 
    const formattedCreatedAt = getCurrentTimeFormatted(createdAt);
    // show or hide icon and username retweeted 
    const classname = author && tweet.originalTweet ? "flex" : "hidden";
    // user bookmarked tweeted ?
    const tweetBookmarked = userInfo.bookmarked.includes(_id);
    // content tweet
    let tweetContent = {
      username: originalTweet ? originalTweet.author.username : tweetAuthor.username,
      profile: tweetAuthor.profilePic,
      content,
      createdAt: formattedCreatedAt,
      id: _id,
      likeCount: calculateLikeCount(tweet),
      srcLikeIcon: likeIcon,
      retweetedUsername: originalTweet
        ? originalTweet.author.username
        : author.username,
      retweetCount,
      isRetweeted: classname,
      srcRetweetIcon: retweetedIcon,
      isBookmarked: tweetBookmarked ? "block" : "hidden",
      bookmarkIcon: tweetBookmarked
        ? "text-blue-400 "
        : "text-gray-400 hover:text-blue-400",
      showDeleteIcon: tweet.author._id.toString() === userInfo.userId.toString()  ? 'block' : 'hidden',
    };
    // return Tweet
    return Tweet(tweetContent);
  } catch (error) {
    console.log('error for render tweet :',error);
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
