import { findUserTweets, getProfileUser } from "../utils/apiOperations.js";
import { randomColor } from "../utils/utils.js";

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
  const buttons = userProfileContainer.querySelectorAll("#userInteraction button");
  buttons.forEach((button) => {
    button.addEventListener("click", async () => {
      const action = button.dataset.action;

      switch (action) {
        case "posts":
          const posts = await findUserTweets(user.userId);
          break;
        case "likes":
          break;
        case "retweets":
          break;
      }
    });
  });
}
