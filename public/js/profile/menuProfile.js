import { TweetsProfile } from "../components/profile/Tweets.js";
import { loadInfo } from "./loadInfo.js";
import { listMenuTweet } from "../tweets/helperTweet.js";
import {
  findLikedTweets,
  findRetweetedTweets,
  findUserTweets,
} from "../utils/apiOperations.js";
import { getCurrentTimeFormatted, randomColor } from "../utils/utils.js";
import { saveContainer } from "./utils.js";

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
  const container = document.getElementById("userProfileContainer");
  document.addEventListener('DOMContentLoaded',()=>{
    saveContainer(container)
  })
}

export async function getUserProfile() {
  const userProfileContainer = document.getElementById("userProfileContainer");
  const user = await loadInfo();
  const buttons = userProfileContainer.querySelectorAll(
    "#userInteraction button"
  );
  const wrapper = userProfileContainer.querySelector(
    "#wrapper__content-profile"
  );
  await loading(wrapper, user, findUserTweets);
  handlerClickIcons(wrapper);
  buttons.forEach((button) => {
    button.addEventListener("click", async () => {
      const action = button.dataset.action;
      userProfileContainer
        .querySelectorAll("#userInteraction .button__wrapper-profile")
        .forEach((elm) => {
          setTimeout(elm.classList.remove("activeButton"), 700);
        });
      button.parentElement.classList.add("activeButton");
      buttons.forEach((btn) => btn.classList.remove("activeButton"));
      switch (action) {
        case "posts":
          await loading(wrapper, user, findUserTweets);
          handlerClickIcons();
          break;
        case "likes":
          await loading(wrapper, user, findLikedTweets,userProfileContainer);
          handlerClickIcons();
          break;
        case "retweets":
          await loading(wrapper, user, findRetweetedTweets);
          handlerClickIcons();
          break;
      }
    });
  });
}
function handlerClickIcons() {
  listMenuTweet(".list__menu-icon-profile", 1, false);
}
async function loading(wrapper, user, findUser) {
  wrapper.innerHTML = "";
  const posts = await findUser(user.userId);
  if (posts.length === 0) {
    wrapper.style.cssText =
      "color: white; font-size: 35px; font-family: 'Mavis', sans-serif;";
    wrapper.innerHTML = "<p style='margin: 0;text-align: center;'>No posts</p>";
  }
  posts.forEach(async (tweet, index) => {
    const createdAt = getCurrentTimeFormatted(tweet.createdAt);
    const isBookmarked = user.bookmarked.includes(tweet._id)
      ? "block"
      : "hidden";
    const content = tweet.content;
    const template = TweetsProfile({
      id: tweet._id,
      content,
      createdAt,
      isBookmarked,
      showDeleteIcon: tweet.author._id === user.userId ? "block" : "hidden",
    });
    // Create a new element and set its opacity to 0
    const newElement = document.createElement("div");
    newElement.innerHTML = template;
    newElement.style.opacity = 0;

    // Append the new element to the wrapper
    wrapper.appendChild(newElement);
    
    // Gradually increase the opacity to create a fade-in effect
    await new Promise((resolve) => {
      setTimeout(() => {
        newElement.style.transition = "opacity 0.5s";
        newElement.style.opacity = 1;
        resolve();
      }, index * 100); // Adjust the duration and delay as needed
    });
  });
}
