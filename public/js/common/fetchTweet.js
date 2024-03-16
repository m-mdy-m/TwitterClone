import {
  AddTweet,
  ShowTweets,
  attachIconClickListeners,
} from "../tweets/tweetHandlers.js";
import { displayMessage, getCSRFHeader } from "./handlers.js";
const msgElm = document.getElementById("msgElm");
// Function to fetch tweets from the server

