import Tweet from "../components/Tweet.js";
import { handleClick } from "./Like.js";
const wrapper = document.getElementById("wrapperTweet");

// Function to add a single tweet to the UI
export function AddTweet(response) {
  // Extract tweet data from the response
  const tweetData = response.data.data;

  // Render the tweet template
  const tweetTemplate = renderTweet(tweetData);

  // Append the rendered tweet template to the wrapper element
  appendTweet("afterbegin", tweetTemplate);

  iconsHandler();
  // Clear the tweet input field after adding the tweet
  clearTweetInput();
}

// Function to show multiple tweets in the UI
export function ShowTweets(response) {
  // Extract tweets array from the response
  let tweets = response.data.tweets;

  // Sort the tweets array by createdAt in descending order (newest to oldest)
  tweets.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

  // Iterate over each tweet and render its template
  tweets.forEach((tweet) => {
    const tweetTemplate = renderTweet(tweet);

    // Append the rendered tweet template to the wrapper element
    appendTweet("beforeend", tweetTemplate);
  });
  // Clear the tweet input field after showing tweets
  clearTweetInput();
}

// Function to render a single tweet template
function renderTweet(tweet) {
  // Extract relevant data from the tweet object
  const { postedBy, content, createdAt } = tweet;
  const { username, profilePic, _id } = postedBy;
  // Format the creation time of the tweet
  const formattedCreatedAt = getCurrentTimeFormatted(createdAt);

  // Render the tweet template with formatted creation time
  return Tweet({
    username,
    profile: profilePic,
    content,
    createdAt: formattedCreatedAt,
    id: _id,
  });
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

// Function to format the creation time of the tweet
function getCurrentTimeFormatted(time) {
  // Create a Date object from the provided time
  const createdAt = new Date(time);

  // Get the current time
  const currentTime = new Date();

  // Calculate the time difference in milliseconds
  const timeDifference = currentTime - createdAt;

  // Convert the time difference from milliseconds to seconds
  const secondsDifference = Math.floor(timeDifference / 1000);

  // Define time units in seconds
  const minute = 60;
  const hour = minute * 60;
  const day = hour * 24;
  const month = day * 30;
  const year = month * 12;

  // Determine the appropriate past tense based on the time difference
  if (secondsDifference < minute) {
    return "just now";
  } else if (secondsDifference < hour) {
    const minutes = Math.floor(secondsDifference / minute);
    return `${minutes} minute${minutes > 1 ? "s" : ""} ago`;
  } else if (secondsDifference < day) {
    const hours = Math.floor(secondsDifference / hour);
    return `${hours} hour${hours > 1 ? "s" : ""} ago`;
  } else if (secondsDifference < month) {
    const days = Math.floor(secondsDifference / day);
    return `${days} day${days > 1 ? "s" : ""} ago`;
  } else if (secondsDifference < year) {
    const months = Math.floor(secondsDifference / month);
    return `${months} month${months > 1 ? "s" : ""} ago`;
  } else {
    // Format the date and time components separately
    const formattedDate = createdAt.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
    const formattedTime = createdAt.toLocaleTimeString("en-US", {
      hour: "numeric",
      minute: "2-digit",
    });

    // Concatenate the formatted date and time with a separator
    return `${formattedDate} • ${formattedTime}`;
  }
}
// Attaches click event listeners to all elements with the class "icons".
export function iconsHandler() {
  // Select all elements with the class "icons"
  document.querySelectorAll(".icons").forEach((icon) => {
    // Attach a click event listener to each icon
    icon.addEventListener("click", handleClick);
  });
}
