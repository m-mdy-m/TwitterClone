import Header from "./components/common/header.js";
import { UserStory } from "./components/home/UserStory.js";
import { handleTweetTextAreaEvents } from "./tweets/Post.js";
import { listMenuTweet, showUserRetweeted } from "./tweets/helperTweet.js";
import {
  getTweets,
  getUserInfo,
  findFollowingUser,
} from "./utils/apiOperations.js";

export async function HomePage() {
  handleTweetTextAreaEvents();
  const header = document.querySelector("header");
  const profile_user_create = document.querySelector(".profile_user_create");
  const user = await getUserInfo();
  renderStory(user);
  profile_user_create.src = user.profilePic;
  header.innerHTML = Header({
    profile: user.profilePic,
    username: user.username,
  });
  await getTweets();
  showUserRetweeted();
  listMenuTweet();
}
export async function renderStory(user) {
  const storyBox = document.querySelector("#wrapper__story-box");
  const users = await findFollowingUser(user.userId);
  users.forEach((user) => {
    const info = {
      img: user.profilePic,
      username: user.username,
    };
    const tm = UserStory(info);
    storyBox.innerHTML += tm;
  });
}
