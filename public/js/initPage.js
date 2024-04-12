import { getUserProfile } from "./profile/menuProfile.js";
import { recipient, sender } from './components/home/direct/messageTemplates.js'
export async function initPage() {
  getUserProfile();
  const socket = io();
  const box = document.querySelector('#chat_box')
  document.querySelector("#btn-send").addEventListener("click", () => {
    const message = document.querySelector("textarea").value;
    const tm = sender({message})
    box.innerHTML += tm
    socket.emit("message", message);
    // Clear textarea after sending message
    document.querySelector("textarea").value = "";
  });
  // Add event listener for receiving messages
  socket.on("message", (message) => {
    const tm = recipient({message})
    box.innerHTML += tm
  });
}
