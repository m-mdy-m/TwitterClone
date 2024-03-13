import { ContentSection } from "./components/home/Content.js";

function setupPage() {
  const content = document.getElementById("content-home");
  content.innerHTML = ContentSection({
    username: "m__mdy__m",
    profileStory: "/assets/icon/nav/user.svg",
    profilePic: '"/assets/images/profilePic.png"',
  });
}

document.addEventListener("DOMContentLoaded", setupPage());
