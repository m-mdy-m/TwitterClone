import Tweet from "../components/Tweet.js";
const wrapper = document.getElementById("wrapperTweet");
export function AddTweet(response) {
  const responseData = response.data;
  const tweetData = responseData.data;
  const content = tweetData.content;
  const { username, profilePic } = tweetData.postedBy;
  const tweetTemplate = Tweet({ username, content, profile: profilePic });
  wrapper.insertAdjacentHTML("beforeend", tweetTemplate);
  document.getElementById("tweetInput").value = "";
}
export function ShowTweets(response) {
  const tweets = response.data.tweets;
  console.log('tweets=>',tweets);
}
