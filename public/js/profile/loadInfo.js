import { getProfileUser } from "../utils/apiOperations.js";

export async function loadInfo() {
  const username = window.location.pathname.split("/")[2];
  const response = await getProfileUser(username);
  const user = response.data.user;
  const usernameElm = document.querySelector("[data-username]")
  const bioElm = document.querySelector("[data-bio]")
  const email = document.querySelector('[data-input-email]')
  email.value = user.email
  // Select elements using appropriate attribute selectors
  usernameElm.innerHTML = `@${user.username}`;
  usernameElm.nextElementSibling.value = `@${user.username}`
  bioElm.innerHTML = user.bio;
  bioElm.nextElementSibling.value = user.bio;
  return user;
}
