import { getProfileUser } from "../utils/apiOperations.js";

export async function loadInfo() {
  const username = window.location.pathname.split("/")[2];
  const response = await getProfileUser(username);
  const user = response.data.user;
  // Select elements using appropriate attribute selectors
  document.querySelector("[data-username]").innerHTML = `@${user.username}`;
  document.querySelector("[data-bio]").innerHTML = user.bio;
  return user;
}
