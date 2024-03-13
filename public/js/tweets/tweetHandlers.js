import Tweet from "../components/Tweet.js";
const wrapper = document.getElementById("wrapperTweet");

// Function to add a single tweet to the UI
export function AddTweet(response) {
  // Extract tweet data from the response
  const tweetData = response.data.data;

  // Render the tweet template
  const tweetTemplate = renderTweet(tweetData);

  // Append the rendered tweet template to the wrapper element
  appendTweet(tweetTemplate);

  // Clear the tweet input field after adding the tweet
  clearTweetInput();
}

// Function to show multiple tweets in the UI
export function ShowTweets(response) {
  // Extract tweets array from the response
  const tweets = response.data.tweets;

  // Iterate over each tweet and render its template
  tweets.forEach((tweet) => {
    const tweetTemplate = renderTweet(tweet);

    // Append the rendered tweet template to the wrapper element
    appendTweet(tweetTemplate);
  });

  // Clear the tweet input field after showing tweets
  clearTweetInput();
}

// Function to render a single tweet template
function renderTweet(tweet) {
  // Extract relevant data from the tweet object
  const { username, profilePic, content, createdAt } = tweet;

  // Format the creation time of the tweet
  const formattedCreatedAt = getCurrentTimeFormatted(createdAt);

  // Render the tweet template with formatted creation time
  return Tweet({
    username,
    profile: profilePic,
    content,
    createdAt: formattedCreatedAt,
  });
}

// Function to append a tweet template to the UI
function appendTweet(tweetTemplate) {
  // Append the tweet template HTML to the wrapper element
  wrapper.insertAdjacentHTML("beforeend", tweetTemplate);
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

  // Format the date and time components separately
  const formattedDate = createdAt.toLocaleDateString("en-US", {
    day: "numeric",
    month: "short",
  });
  const formattedTime = createdAt.toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  });

  // Concatenate the formatted date and time with a separator
  return formattedDate + " • " + formattedTime;
}
