import Tweet from "../components/Tweet.js";
const wrapper = document.getElementById("wrapperTweet");
export function AddTweet(response) {
  const responseData = response.data;
  const tweetData = responseData.data;
  const content = tweetData.content;
  const { username, profilePic } = tweetData.postedBy;
  const createdAt = getCurrentTimeFormatted(tweetData)
  const tweetTemplate = Tweet({ username, content, profile: profilePic,createdAt});
  wrapper.insertAdjacentHTML("beforeend", tweetTemplate);
  document.getElementById("tweetInput").value = "";

}
export function ShowTweets(response) {
  const tweets = response.data.tweets;
  console.log('tweets=>',tweets);
}



function getCurrentTimeFormatted(tweetData){
      // Extracting the time when the post was created
  const createdAt = new Date(tweetData.createdAt);

  // Format the date as "DD Mon" (e.g., "13 Mar")
  const formattedDate = createdAt.toLocaleDateString('en-US', { day: 'numeric', month: 'short' });
  // Format the time as "hh:mm AM/PM" (e.g., "8:35 PM")
  const formattedTime = createdAt.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit', hour12: true });
  // Displaying the formatted timestamp
  const time = formattedDate + ' • ' + formattedTime

  return time
}