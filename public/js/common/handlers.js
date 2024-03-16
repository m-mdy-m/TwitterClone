import Header from "../components/common/header.js";
import { showMessage } from "../utils/helper.js";
import { getMsgElement } from "../utils/utils.js";
import getCSRFToken from "./getCSRFToken.js";
// DOM elements
const charCount = document.getElementById("charCount");
const maxLength = 300;
const msgElm = getMsgElement()
/**
 * Updates the character count display and validates the tweet length.
 * Adjusts styles based on the length and validation status.
 */
export function updateCharCount(e) {
  const tweet = e.target.value;
  const validation = validateTweet(tweet);
  let currentLength = e.target.value.length;
  const textarea = e.target;
  charCount.textContent = `${currentLength}/${maxLength}`;
  // Change color if exceeding maximum limit
  if (currentLength > maxLength) {
    charCount.style.color = "red";
    textarea.style.cssText = "border-color:red;";
    return { valid: validation.valid, message: validation.message };
  } else if (!validation.valid) {
    return { valid: validation.valid, message: validation.message };
  } else {
    charCount.style.color = "rgb(107, 114, 128)";
    textarea.style.cssText = "border-color: #343435;";
    return { valid: validation.valid, value: validation.value };
  }
}


/**
 * Validates the tweet, checking for empty, excessive length, and other criteria.
 * Returns an object with the validity status and an error message if applicable.
 */
export function validateTweet(tweet) {
  const value = tweet.trim();
  const length = value.length;
  // Check if the input is empty
  if (length === 0) {
    return {
      valid: false,
      message: "Tweet cannot be empty",
    };
  }
  // Check tweet length against the maximum length
  if (length >= maxLength) {
    return {
      valid: false,
      message: `Tweet exceeds maximum length of ${maxLength} characters`,
    };
  }
  // If all checks pass, the tweet is considered valid
  return { valid: true, value: value };
}

export async function getCSRFHeader() {
  // Fetch CSRF token
  const csrfToken = await getCSRFToken();
  if (!csrfToken) {
    msgElm.style.display = "block";
    showMessage(
      msgElm,
      "Unable to create tweet. CSRF token is missing or invalid.",
      "#ff6347"
    );
    return;
  }
  const header = {
    headers: {
      "X-CSRF-Token": csrfToken,
    },
  };
  return header;
}
export function upHeader(user) {
  console.log("user =>", user);
  const header = document.querySelector("header");
  if (user) {
    header.innerHTML = Header({
      profile: user.profilePic,
      username: user.username,
    });
  }
  return;
}
