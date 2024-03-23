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
export function AddTweet(response, userInfo) {
  try {
    // Ensure the response contains tweet data
    if (!response || !response.data || !response.data.data) {
      // Display an error message if the response data is invalid
      showMessage(msgELm, "Error: Invalid response data.", "#ff6347");
      return;
    }
    // Extract tweet data from the response
    const tweetData = response.data.data;
    // Render the tweet template
    const tweetTemplate = renderTweet(tweetData, userInfo);

    // Append the rendered tweet template to the wrapper element
    appendTweet("afterbegin", tweetTemplate);

    attachIconClickListeners();
    // Clear the tweet input field after adding the tweet
    clearTweetInput();
  } catch (error) {
    // Display a generic error message for adding tweet failure
    showMessage(msgELm, 'Error adding tweet. Please try again.', '#ff6347');
  }
}

// Function to show multiple tweets in the UI
export function ShowTweets(response, userInfo) {
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
      const tweetTemplate = renderTweet(tweet, userInfo);

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

// Function to render a single tweet template
function renderTweet(tweet, userInfo) {
  // Ensure the tweet and user information are provided
  if (!tweet || !userInfo) {
    showMessage(msgELm, "Error: Invalid tweet or user information.", "#ff6347");
  }
  try {
    // Extract relevant data from the tweet object
    const { author, content, createdAt, _id,likes,originalTweet } = tweet;
    const { username, profilePic } = author;
    const { userId } = userInfo;
    const isLiked = likes.some((like) => like === userId);
      console.log('tweet =>',tweet);
      console.log('userInfo =>',userInfo);
    // Calculate the number of likes for the tweet
    const likeCount = calculateLikeCount(tweet);
    // Gather all necessary data
    const likeIcon = isLiked ? "nav/heart-full.svg" : "nav/heart-null.svg";
    // console.log('likeIcon=>',likeIcon);
    const formattedCreatedAt = getCurrentTimeFormatted(createdAt);
    // Render the tweet template with formatted creation time
    return Tweet({
      username,
      profile: profilePic,
      content,
      createdAt: formattedCreatedAt,
      id: _id,
      likeCount,
      srcLikeIcon: likeIcon,
      retweetCount: "",
    });
  } catch (error) {
    console.log(error);
    // Handle any errors that occur during the asynchronous operation
    showMessage(msgELm, "Error rendering tweet. Please try again.", "#ff6347");
    // Return null or handle the error in another appropriate way
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
      showMessage(msgELm, 'No icons found.', '#ff6347');
      return;
    }

    // Attach a click event listener to each icon
    icons.forEach((icon) => {
      icon.addEventListener("click", handleClick);
    });
  } catch (error) {
    // Display a generic error message for attaching icon click listeners
    showMessage(msgELm, 'Error attaching icon click listeners. Please try again.', '#ff6347');
  }
}
