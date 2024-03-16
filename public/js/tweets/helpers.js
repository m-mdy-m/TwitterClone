// Function to calculate the number of likes for the tweet
export const calculateLikeCount = (tweet) =>
  tweet.likes.length > 0 ? tweet.likes.length : "";

// Function to determine if the current user has liked the tweet
const currentUserLikedTweet = (likes, TweetId) => likes.includes(TweetId);

// Function to set the like icon based on whether the current user has liked the tweet
export const setLikeIcon = (likes, TweetId) =>
  currentUserLikedTweet(likes, TweetId)
    ? "nav/heart-full.svg"
    : "nav/heart-null.svg";

// Function to format the creation time of the tweet
export function getCurrentTimeFormatted(time) {
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