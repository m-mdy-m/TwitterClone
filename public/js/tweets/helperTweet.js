import { toggleBookmark, toggleDeleteTweet } from "../utils/apiOperations.js";

export function showUserRetweeted() {
  document.querySelectorAll(".container__profile-users").forEach((elm) => {
    const profile = elm.querySelector(".profile-user");
    const userRetweeted = elm.querySelector(".user-retweeted");

    profile.addEventListener("mouseenter", () => {
      userRetweeted.classList.remove("hiddenId");
      userRetweeted.classList.add("visibleId");
    });

    profile.addEventListener("mouseleave", () => {
      setTimeout(() => {
        userRetweeted.classList.remove("visibleId");
        userRetweeted.classList.add("hiddenId");
      }, 1500);
    });
  });
}

// Function to handle the list menu of tweets
export function listMenuTweet() {
  document.querySelectorAll(".list__menu-tweet").forEach((icon) => {
    // Find the tweet element and its ID
    const tweet = icon.parentNode.parentNode.parentNode;
    const tweetId = tweet.getAttribute('data-id');

    // Find the bookmarked status element and bookmark icon
    const bookmarked = tweet.querySelector('.bookmarked');
    const bookmarkIcon = icon.querySelector(".bookmarkIcon");

    // Add event listener to the bookmark icon for toggling bookmark status
    bookmarkIcon.addEventListener("click", async () => {
      // Toggle bookmark status of the tweet
      const isBookmarked = await toggleBookmark(tweetId);
      
      // Update bookmark display and icon color based on bookmark status
      bookmarked.style.display = `${isBookmarked ? 'block' : 'none'}`;
      bookmarkIcon.style.color = `${isBookmarked ? 'rgb(96 165 250)' : 'rgb(156 163 175)'}`;
    });

    // Add event listener to the delete icon for deleting the tweet
    icon.querySelector(".deleteIcon").addEventListener('click', async () => {
      // Toggle delete status of the tweet
      const deleteTweet = await toggleDeleteTweet(tweetId);
      
      // If the tweet is deleted, add a delete animation and remove the tweet after a delay
      if (deleteTweet) {
        tweet.classList.add('delete-animation');
        setTimeout(() => {
          tweet.remove();
        }, 1500);
      }
    });
  });
}
