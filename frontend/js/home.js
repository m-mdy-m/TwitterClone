import { CreateTweet } from "./components/Create-Tweet.js";
import { WrapperStory } from "./components/home/WrapperStory.js";
const wrapper = document.getElementById("wrapperStory");
const createTweet = document.getElementById('create-tweet')
wrapper.innerHTML = WrapperStory({
  username: "m__mdy__m",
  profilePic: "/assets/icon/nav/user.svg",
});
createTweet.innerHTML = CreateTweet({username:"m__mdy__m",profile:"/assets/images/profilePic.png"})
