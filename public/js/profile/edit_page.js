import {
  changePassword,
  checkPasswordValue,
  getUserInfo,
  updateUserInformation,
  uploadApi,
} from "../utils/apiOperations.js";
import { showErrorMessage } from "../utils/helper.js";
export function edit_page() {
  const wrapperForm = document.querySelector(".wrapper__change-password");
  const btnCancel = document.querySelector(".button__cancel-form");
  btnCancel.addEventListener("click", () => {
    wrapperForm.style.cssText = "opacity:0;display:none;";
  });
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
  btn.addEventListener("click", () => {
    wrapperForm.style.cssText = "opacity:1;display:block;";
    handlerPasswordChanger();
  });
  const profileImage = document.querySelector("#profile-image");
  const form = document.querySelector("#upload_img");
  const btnUpload = document.querySelector(".btn__upload-img");
  btnUpload.addEventListener("click", async () => {
    const user = await getUserInfo();
    let action = `/profile/${user.username}`;
    form.setAttribute("action", action);
    profileImage.addEventListener("input", async () => {
      const file = profileImage.files[0];
      if (file) {
        try {
          const response = await uploadApi(file, user.userId);
          console.log("Upload response:", response);
          // Handle response if needed
        } catch (error) {
          console.error("Upload failed:", error);
          showErrorMessage(error);
        }
      }
    });
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

async function handlerPasswordChanger() {
  const user = await getUserInfo();
  const password_old = document.querySelector(".password_old input");
  const form = document.querySelector(".password_new-form");
  const btn = document.querySelector(".password_new-form button");
  const passwordInput = document.querySelector(".password_new-input");
  const confInput = document.querySelector(".password_new-input-conf");
  password_old.addEventListener("input", (e) => {
    const value = e.target.value;
    setTimeout(async () => {
      const response = await checkPasswordValue(value, user.userId);
      if (response) {
        let action = `/profile/${user.username}`;
        form.setAttribute("action", action);
        passwordInput.style.cursor = "text;";
        confInput.style.cursor = "text;";
        btn.style.cursor = "pointer;";
        form.style.opacity = 1;
      }
    }, 1500);
  });
  btn.addEventListener("click", async (e) => {
    e.preventDefault();
    const newPassword = passwordInput.value;
    const confPassword = confInput.value;
    const response = await changePassword(newPassword, user.userId);
    if (response && confPassword == newPassword) {
      window.location.reload();
    }
  });
}
