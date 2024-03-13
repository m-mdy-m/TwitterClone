import Tweet from "../components/Tweet.js";
const wrapper = document.getElementById("wrapperTweet");

export function AddTweet(response) {
  const tweetData = response.data.data;
  const tweetTemplate = renderTweet(tweetData);
  appendTweet(tweetTemplate);
  clearTweetInput();
}

export function ShowTweets(response) {
  const tweets = response.data.tweets;
  tweets.forEach((tweet) => {
    const tweetTemplate = renderTweet(tweet);
    appendTweet(tweetTemplate);
  });
  clearTweetInput();
}

function renderTweet(tweet) {
  const { username, profilePic, content, createdAt } = tweet;
  const formattedCreatedAt = getCurrentTimeFormatted(createdAt);
  return Tweet({ username, profile: profilePic, content, createdAt: formattedCreatedAt });
}

function appendTweet(tweetTemplate) {
  wrapper.insertAdjacentHTML("beforeend", tweetTemplate);
}

function clearTweetInput() {
  document.getElementById("tweetInput").value = "";
}

function getCurrentTimeFormatted(time) {
  const createdAt = new Date(time);
  const formattedDate = createdAt.toLocaleDateString("en-US", { day: "numeric", month: "short" });
  const formattedTime = createdAt.toLocaleTimeString("en-US", { hour: "numeric", minute: "2-digit", hour12: true });
  return formattedDate + " • " + formattedTime;
}
