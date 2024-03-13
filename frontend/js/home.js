import { WrapperStory } from "./components/home/WrapperStory.js";
const wrapper = document.getElementById("wrapperStory");
wrapper.innerHTML = WrapperStory({
  username: "m__mdy__m",
  profilePic: "/assets/icon/nav/user.svg",
});
