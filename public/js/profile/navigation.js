import { find_interaction_user, getProfileUser } from "../utils/apiOperations.js";
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
  const userInteraction =
    userProfileContainer.querySelector("#userInteraction");
  const posts = userInteraction.querySelector(".posts");
  const likes = userInteraction.querySelector(".likes");
  const retweets = userInteraction.querySelector(".retweets");
  const buttons = {
    posts,
    likes,
    retweets,
  };
  Object.values(buttons).forEach((button) => {
    console.log({user})
    button.addEventListener("click", async ()=> {
      const clickedButton = Object.keys(buttons).find(
        (key) => buttons[key] === this
      );
      const correspondingElement = document.querySelector(`.${clickedButton}`);
      await find_interaction_user(user.userId)
      switch(clickedButton){
        case "posts":
          break;
        case "likes":
          break;
        case "retweets":
          break;
      }
    });
  });
}
