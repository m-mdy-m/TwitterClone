import {
  getTweetInfo,
  toggleBookmark,
  toggleDeleteTweet,
  toggleEditTweet,
} from "../utils/apiOperations.js";

// Function to show user retweeted information on mouse hover
export function showUserRetweeted() {
  // Select all elements with class "container__profile-users"
  document.querySelectorAll(".container__profile-users").forEach((elm) => {
    // Find profile and user retweeted elements within each container
    const profile = elm.querySelector(".profile-user");
    const userRetweeted = elm.querySelector(".user-retweeted");

    // Add mouseenter event listener to profile element
    profile.addEventListener("mouseenter", () => {
      // Show user retweeted information by removing hidden class and adding visible class
      userRetweeted.classList.remove("hiddenId");
      userRetweeted.classList.add("visibleId");
    });

    // Add mouseleave event listener to profile element
    profile.addEventListener("mouseleave", () => {
      // Hide user retweeted information after a delay
      setTimeout(() => {
        userRetweeted.classList.remove("visibleId");
        userRetweeted.classList.add("hiddenId");
      }, 1500); // Delay of 1500 milliseconds (1.5 seconds)
    });
  });
}
// Function to handle the list menu of tweets
export function listMenuTweet() {
  document.querySelectorAll(".list__menu-tweet").forEach((icon) => {
    // Find the tweet element and its ID
    const tweet = icon.parentNode.parentNode.parentNode;
    const tweetId = tweet.getAttribute("data-id");
    icon.addEventListener("mouseenter", () => {
      icon.classList.add("show-menu-tweet");
      icon.classList.remove("hidden-menu-tweet");
    });
    icon.addEventListener("mouseleave", () => {
      icon.classList.remove("show-menu-tweet");
      icon.classList.add("hidden-menu-tweet");
    });
    // Find the bookmarked status element and bookmark icon
    const bookmarked = tweet.querySelector(".bookmarked");
    const bookmarkIcon = icon.querySelector(".bookmarkIcon");

    // Add event listener to the bookmark icon for toggling bookmark status
    bookmarkIcon.addEventListener("click", async () => {
      // Toggle bookmark status of the tweet
      const isBookmarked = await toggleBookmark(tweetId);

      // Update bookmark display and icon color based on bookmark status
      bookmarked.style.display = `${isBookmarked ? "block" : "none"}`;
      bookmarkIcon.style.color = `${
        isBookmarked ? "rgb(96 165 250)" : "rgb(156 163 175)"
      }`;
    });

    // Add event listener to the delete icon for deleting the tweet
    icon.querySelector(".deleteIcon").addEventListener("click", async () => {
      // Toggle delete status of the tweet
      const deleteTweet = await toggleDeleteTweet(tweetId);

      // If the tweet is deleted, add a delete animation and remove the tweet after a delay
      if (deleteTweet) {
        tweet.classList.add("delete-animation");
        setTimeout(() => {
          tweet.remove();
        }, 1500);
      }
    });
    icon.querySelector(".editIcon").addEventListener("click", async () => {
      const tweetInput = document.getElementById("editContent");
      const button = document.getElementById('iconSubmitEdit')
      button.classList.add('show-button-edit')
      button.addEventListener('click',()=>{
        button.classList.remove('show-button-edit')
        button.classList.add('remove-button-edit')
      })
      tweetInput.focus();
      editTweetContent();
    });
  });
}
// Function to automatically resize the input field based on its content
export function autoResizeInput() {
  // Get the input element and its parent container
  const tweetInput = document.getElementById("editContent");
  const parent = tweetInput.parentNode.parentNode.parentNode.parentNode;

  // Set the input field height to "auto" to allow it to expand based on content
  tweetInput.style.height = "auto";

  // Set the input field height to match its scroll height, effectively resizing it based on content
  tweetInput.style.height = tweetInput.scrollHeight + "px";

  // Calculate the actual height of the parent container including padding and borders
  const parentStyles = window.getComputedStyle(parent);
  const parentPaddingTop = parseFloat(parentStyles.paddingTop);
  const parentPaddingBottom = parseFloat(parentStyles.paddingBottom);
  const parentBorderTop = parseFloat(parentStyles.borderTopWidth);
  const parentBorderBottom = parseFloat(parentStyles.borderBottomWidth);
  const parentHeight =
    parent.clientHeight -
    parentPaddingTop -
    parentPaddingBottom -
    parentBorderTop -
    parentBorderBottom;

  // Determine the minimum and maximum allowable heights for the parent container
  const minHeight = parentHeight;
  const maxHeight = parentStyles.height;

  // Calculate the new height for the parent container, ensuring it stays within the min and max height limits
  const newHeight = Math.min(
    Math.max(
      tweetInput.scrollHeight +
        parentPaddingTop +
        parentPaddingBottom +
        parentBorderTop +
        parentBorderBottom,
      minHeight
    ),
    maxHeight
  );

  // Apply the new height to the parent container
  parent.style.height = newHeight + "px";
}

export function editTweetContent() {
  const tweetInput = document.getElementById("editContent");
  tweetInput.addEventListener("input", () => {
    console.log("typing..");
    autoResizeInput();
  });
}
