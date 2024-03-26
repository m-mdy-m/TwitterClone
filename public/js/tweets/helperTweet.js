import { toggleBookmark } from "../utils/apiOperations.js";

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

export function listMenuTweet() {
  document.querySelectorAll(".list__menu-tweet").forEach((icon) => {
    const tweet = icon.parentNode.parentNode.parentNode
    const tweetId = tweet.getAttribute('data-id')
    const bookmarked= tweet.querySelector('.bookmarked')
    icon.querySelector(".bookmarkIcon").addEventListener("click", async () => {
      const fetchApi = await toggleBookmark(tweetId)
      console.log('bookmarked : ',bookmarked)
      bookmarked.style.display = 'block'
    });
    // const deleteIcon = icon.querySelector(".deleteIcon");
  });
}
