import { TweetsProfile } from "../components/profile/Tweets.js";
import { listMenuTweet } from "../tweets/helperTweet.js";
import { findUserTweets, getProfileUser } from "../utils/apiOperations.js";
import { getCurrentTimeFormatted, randomColor } from "../utils/utils.js";

export function menuProfile() {
  getUserProfile();
  const navProfile = document.querySelector(".nav__profile-user");

  navProfile.querySelectorAll(".icons").forEach((icon) => {
    icon.addEventListener("mouseenter", () => {
      icon.style.cssText = `background: ${randomColor()}; transition: all 0.5s ease;`;
      const tagP = icon.querySelector("p");
      tagP.style.cssText = "display: block; transition: all 0.3s ease;";
    });
  });
  navProfile.querySelectorAll(".icons").forEach((icon) => {
    icon.addEventListener("mouseleave", () => {
      icon.style.cssText = `background: auto;transition: all 0.3s ease;`;
      const tagP = icon.querySelector("p");
      tagP.style.cssText = "display: none; transition: all 0.3s ease;";
    });
  });
}

export async function getUserProfile() {
  const username = window.location.pathname.split("/")[2];
  const userProfileContainer = document.getElementById("userProfileContainer");
  const response = await getProfileUser(username);
  const user = response.data.user;
  userProfileContainer.querySelector(
    "#userProfile_username"
  ).innerHTML = `@${username}`;
  userProfileContainer.querySelector("#userProfile_bio").innerHTML = user.bio;
  const buttons = userProfileContainer.querySelectorAll(
    "#userInteraction button"
  );
  const wrapper = userProfileContainer.querySelector(
    "#wrapper__content-profile"
  );
  const tweet = await loadPosts(wrapper, user);
  listMenuTweet(".list__menu-icon-profile",tweet,tweet._id,tweet)
  buttons.forEach((button) => {
    button.addEventListener("click", async () => {
      const action = button.dataset.action;

      switch (action) {
        case "posts":
          const tweet = await loadPosts(wrapper, user);
          listMenuTweet(".list__menu-icon-profile",tweet._id,tweet)
          break;
        case "likes":
          break;
        case "retweets":
          break;
      }
    });
  });
}
async function loadPosts(wrap, user) {
  const posts = await findUserTweets(user.userId);
  posts.forEach((tweet) => {
    const createdAt = getCurrentTimeFormatted(tweet.createdAt);
    const isBookmarked = user.bookmarked.includes(tweet._id)
      ? "block"
      : "hidden";
    const content = tweet.content;
    const template = TweetsProfile({ content, createdAt, isBookmarked });
    wrap.innerHTML += template;
    return tweet
  });
}
