import { getProfileUser } from "../utils/apiOperations.js";

export async function loadInfo() {
  const username = window.location.pathname.split("/")[2];
  const path = window.location.pathname.split("/")[1];
  const response = await getProfileUser(username,path);
  const user = response.data.user;
  const usernameElm = document.querySelector("[data-username]");
  const bioElm = document.querySelector("[data-bio]");
  const profileImage = document.querySelector(".profile-img-user");
  if(path === 'profile'){
    const email = document.querySelector("[data-input-email]");
    email.value = user.email;
    usernameElm.nextElementSibling.value = `@${user.username}`;
    bioElm.nextElementSibling.value = user.bio;
  }
  // Select elements using appropriate attribute selectors
  profileImage.src = user.profilePic;
  usernameElm.innerHTML = `@${user.username}`;
  bioElm.innerHTML = user.bio;
  return user;
}
