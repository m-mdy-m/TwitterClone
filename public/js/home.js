import Header from "./components/common/header.js";
import { UserStory } from "./components/home/UserStory.js";
import { chat_template } from "./components/home/direct/chat_template.js";
import { template_direct } from "./components/home/direct/wrapper__direct.js";
import { handleTweetTextAreaEvents } from "./tweets/Post.js";
import { listMenuTweet, showUserRetweeted } from "./tweets/helperTweet.js";
import {
  recipient,
  sender,
} from "./components/home/direct/messageTemplates.js";
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
export async function renderStory(userCurrent) {
  const storyBox = document.querySelector("#wrapper__story-box");
  const users = await findFollowingUser(userCurrent.userId);
  users.forEach((user) => {
    if (!user) return;
    const info = {
      img: user.profilePic,
      username: user.username,
    };
    const tm = UserStory(info);
    storyBox.innerHTML += tm;
    const directs = template_direct({
      bio: user.bio,
      profile: user.profilePic,
      username: user.username,
    });
    const wrapper_directs = document.querySelector(".wrapper_directs");
    wrapper_directs.innerHTML += directs;
    selectChat(user, userCurrent);
  });
  const pages = document.querySelectorAll(".box_pages-following");
  pages.forEach((page) => {
    page.addEventListener("click", () => {
      const username = page.querySelector("h1").innerHTML;
      window.location.href = `/page/${username}`;
    });
  });
}
const SOCKET_URL = "http://localhost:3000";
// user : recipient
// sender : current user
export function selectChat(user, senderUser) {
  const directs_users = document.querySelectorAll(".directs_users");
  directs_users.forEach((itm) => {
    const username = itm.getAttribute("data-username");
    if (user.username === username) {
      itm.addEventListener("click", () => {
        handlerClickProfilePage(user);
      });
    }
  });
}

async function handlerClickProfilePage(user, chatService) {
  try {
    const contentMain = document.getElementById("content_section-main");
    contentMain.innerHTML = chat_template({ img: user.profilePic });
    const chatBox = document.querySelector("#chat_box");

    const socket = await connectToServer();
    setupMessageListeners(chatBox, chatService); // Inject chatService
  } catch (error) {
    console.error("Error initializing chat:", error);
  }
}
async function connectToServer() {
  try {
    const socket = io(SOCKET_URL);
    console.log('hi')
    return socket;
  } catch (error) {
    console.error("Failed to connect to socket server:", error);
    throw error;
  }
}

function setupMessageListeners(chatBox, chatService) {
  document.querySelector("#btn-send").addEventListener("click", () => {
    const message = document.querySelector("textarea").value;
    // socket.emit("message", message);
    const tm = sender({ message });
    chatBox.innerHTML += tm;
    document.querySelector("textarea").value = ""; // Clear textarea
  });
}
