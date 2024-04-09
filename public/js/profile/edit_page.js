import { getUserInfo, updateUserInformation } from "../utils/apiOperations.js";
export function edit_page() {
  document.querySelectorAll(".hidden-edit").forEach((elm) => {
    elm.style.display = "none";
  });
  document.querySelectorAll(".show-edit").forEach((elm) => {
    elm.style.display = "flex";
  });
  const btn = document.querySelector(".btn-change-password ");
  btn.addEventListener("mouseenter", () => {
    setTimeout(() => {
      btn.querySelector("span").style.opacity = "1";
    }, 650);
    btn.style.cssText = "width:9rem;transition: all .6s ease;";
  });
  btn.addEventListener("mouseleave", () => {
    btn.querySelector("span").style.cssText = "opacity:0;";
    btn.style.cssText = "width:2.5rem;transition: all .5s ease;";
  });
  saveChange();
}
function saveChange() {
  document.querySelector(".change-save").addEventListener("click", async () => {
    const user = await getUserInfo();
    const username = document
      .querySelector("[data-input-username]")
      .value.split("@")[1];
    const email = document.querySelector("[data-input-email]").value;
    const bio = document.querySelector("[data-input-bio]").value;
    await updateUserInformation(username, email, bio, user.userId);
    window.location.href = `/profile/${username}`;
  });
}
