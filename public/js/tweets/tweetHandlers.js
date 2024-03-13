import Tweet from "../components/Tweet.js";
const wrapper = document.getElementById("wrapperTweet");
export function AddTweet(response) {
  const responseData = response.data;
  const tweetData = responseData.data;
  const content = tweetData.content;
  const { username, profilePic } = tweetData.postedBy;
  const createdAt = getCurrentTimeFormatted(tweetData.createdAt);
  const tweetTemplate = Tweet({
    username,
    content,
    profile: profilePic,
    createdAt,
  });
  wrapper.insertAdjacentHTML("beforeend", tweetTemplate);
  document.getElementById("tweetInput").value = "";
}
export function ShowTweets(response) {
  const tweets = response.data.tweets;
  tweets.forEach((tweet) => {
    const content = tweet.content;
    const { username, profilePic } = tweet.postedBy;
    const createdAt = getCurrentTimeFormatted(tweet.createdAt);
    const tweetTemplate = Tweet({
      username,
      content,
      profile: profilePic,
      createdAt,
    });
    wrapper.insertAdjacentHTML("beforeend", tweetTemplate);
    document.getElementById("tweetInput").value = "";
  });
}

function getCurrentTimeFormatted(Time) {
  // Extracting the time when the post was created
  const createdAt = new Date(Time);

  // Format the date as "DD Mon" (e.g., "13 Mar")
  const formattedDate = createdAt.toLocaleDateString("en-US", {
    day: "numeric",
    month: "short",
  });
  // Format the time as "hh:mm AM/PM" (e.g., "8:35 PM")
  const formattedTime = createdAt.toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  });
  // Displaying the formatted timestamp
  return formattedDate + " • " + formattedTime;
}
