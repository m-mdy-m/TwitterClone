import { handleBlur,handleFocus } from "./Constants/handlers.js";
const elm = document.getElementById("icon-tweet");
const textarea = document.getElementById("tweetInput");

textarea.addEventListener("focus", () => handleFocus(elm));
textarea.addEventListener("blur", () => handleBlur(elm));
