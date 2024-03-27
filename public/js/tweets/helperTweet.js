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

export function listMenuTweet() {
  document.querySelectorAll(".list__menu-tweet").forEach((icon) => {
    const tweet = icon.parentNode.parentNode.parentNode
    const tweetId = tweet.getAttribute('data-id')
    const bookmarked= tweet.querySelector('.bookmarked')
    const bookmarkIcon = icon.querySelector(".bookmarkIcon");
    bookmarkIcon.addEventListener("click", async () => {
      const isBookmarked = await toggleBookmark(tweetId)
      bookmarked.style.display = `${isBookmarked?'block':'none'} `
      bookmarkIcon.style.color = `${isBookmarked?  'rgb(96 165 250 )' :  'rgb(156 163 175 )'}`
    });
    icon.querySelector(".deleteIcon").addEventListener('click', async()=>{
      const deleteTweet = await toggleDeleteTweet(tweetId)
      if (deleteTweet) {
       tweet.classList.add('delete-animation');
       setTimeout(() => {
         tweet.remove();
       }, 1000);
      }
    })
  });
}
