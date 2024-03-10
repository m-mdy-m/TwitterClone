import { displayMessage } from "../auth/validation.js";
const msgElm = document.getElementById("msgElm");
export async function createTweet(val) {
  if (val.valid) {
    msgElm.style.opacity = 0;
    msgElm.style.display = "none";
    const response = await axios.post("/tweets", val.value);
  } else {
    msgElm.style.display = "block";
    displayMessage(msgElm, val.message, "#FF0000");
  }
}
