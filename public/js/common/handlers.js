import Header from "../components/common/header.js";
import getCSRFToken from "./getCSRFToken.js";
// DOM elements
const iconElement = document.getElementById("icon-tweet");
const charCount = document.getElementById("charCount");
const maxLength = 300;
const msgElm = document.getElementById("msgElm");
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

// Function to hide the icon when textarea is focused
export function hideIconOnFocus(e) {
  const textarea = e.target;
  iconElement.style.opacity = 0;
  iconElement.style.zIndex = -10;
}

// Function to show the icon when textarea loses focus
export function showIconOnBlur(e) {
  const textarea = e.target;
  iconElement.style.opacity = 1;
  iconElement.style.zIndex = 1;
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
// get Id Tweet from element
export function getId(el) {
  return el.parentNode.parentNode.parentNode.parentNode.getAttribute("data-id");
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
