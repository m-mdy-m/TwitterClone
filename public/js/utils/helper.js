import { getCSRFToken, getMsgElement, getAccessToken } from "./utils.js";
let msgElm, iconElement, charCount, maxLength;
document.addEventListener('DOMContentLoaded',()=>{
  msgElm = getMsgElement();
  iconElement = document.getElementById("icon-tweet");
  charCount = document.getElementById("charCount");
  maxLength = 300;
})

// Function to handle unsuccessful form submission
export function handleNotSuccess(data) {
  // Add error message styling to message element
  msgElm.classList.add("msg-errors");
  // Extract error message from server response data
  const message = data.message || data.error;
  // Display error message to the user
  showMessage(msgElm, message, "#944E63");
}
// Function to handle successful form submission
export function handleSuccess(form, message) {
  // Reset the form to clear input fields
  form.reset();
  // Add success message styling to message element
  msgElm.classList.add("msg-errors");
  // Display success message to the user
  showMessage(msgElm, message, "#90EE90");
  // Redirect user to the home page after successful submission
  window.location.href = "/home";
}
// Function to handle server errors
export function handleServerError(form, error) {
  // Add error message styling to message element
  msgElm.classList.add("msg-errors");
  // Clear previous error messages
  msgElm.innerHTML = "";
  // Initialize error message with a default value
  let errorMessage = "An error occurred";
  // Check if the error is a server response error
  if (error.response) {
    // Extract error message from server response data or use default message
    errorMessage = error.response.data.error || errorMessage;
    // Extract form data from server response data, if available
    const formData = error.response.data.validationErrors;
    // Update form values based on server response data, if available
    if (formData) {
      updateFormValues(form, formData);
    }
  } else if (error.request) {
    // Handle cases where no response is received from the server
    errorMessage = "No response received from server";
  }
  // Display error message to the user
  showMessage(msgElm, errorMessage, "#fc6736");
}
// Function to update form values based on server response
export function updateFormValues(form, formData) {
  // Iterate over form data entries
  for (const [name, value] of Object.entries(formData)) {
    // Find input element with matching name attribute
    const input = form.querySelector(`[name="${name}"]`);
    // If input element exists, update its value
    if (input) {
      input.value = value;
    }
  }
}

// Function to show a message with a specified color
export function showMessage(element, message, color) {
  element.style.display = "block";
  // Set background color of message element
  element.style.background = color;
  // Set opacity of message element
  element.style.opacity = 1;
  // Set message content of message element
  element.innerHTML = message;
  setTimeout(() => {
    element.style.opacity = 0;
    setTimeout(() => {
      element.style.display = "none";
    }, 1000);
  }, 5000);
  return;
}

// Function to hide the icon when textarea is focused
export function hideIconOnFocus() {
  iconElement.style.opacity = 0;
  iconElement.style.zIndex = -10;
}

// Function to show the icon when textarea loses focus
export function showIconOnBlur() {
  iconElement.style.opacity = 1;
  iconElement.style.zIndex = 1;
}
// get Id Tweet from element
export function getId(el, steps = 4) {
  let parentNode = el;
  
  // Perform the specified number of parentNode calls
  for (let i = 0; i < steps; i++) {
    parentNode = parentNode.parentNode;
  }

  // Get the value of the "data-id" attribute from the parentNode
  const id = parentNode.getAttribute("data-id");

  // Return the value of the "data-id" attribute
  return id;
}

/**
 * Asynchronously fetches the CSRF token and constructs headers object including CSRF token and JWT token.
 * Displays error messages if CSRF token or JWT token is missing or invalid.
 * @returns {Object} Headers object including CSRF token and JWT token.
 */
export async function getAuthHeaders() {
  // Fetch CSRF token asynchronously
  const csrfToken = await getCSRFToken();
  // If CSRF token is missing or invalid, display an error message and return early
  if (!csrfToken) {
    msgElm.style.display = "block";
    showMessage(
      msgElm,
      "Unable to create tweet. CSRF token is missing or invalid.",
      "#ff6347"
    );
    return;
  }

  // Retrieve JWT token
  const token = getAccessToken();
  // Construct headers object including CSRF token and JWT token
  const header = {
    headers: {
      "X-CSRF-Token": csrfToken,
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  };

  // Return the constructed headers object
  return header;
}

/**
 * Updates the character count display and validates the tweet length.
 * Adjusts styles based on the length and validation status.
 */
export function updateCharCount(e) {
  try {
    const tweet = e.target.value;
    let currentLength = e.target.value.length;
    const validation = validateTweet(tweet, currentLength);
    const textarea = e.target;
    // Update the character count display
    charCount.textContent = `${currentLength}/${maxLength}`;
    // Check if the Enter key is pressed (keyCode 13 for Enter key)
    if (e.keyCode === 13 && !event.shiftKey) {
      // Call adjustStyles to handle Enter key press event
      return adjustStyles(
        currentLength,
        maxLength,
        charCount,
        textarea,
        validation
      );
    }
    // Call adjustStyles to handle Enter key press event
    return adjustStyles(
      currentLength,
      maxLength,
      charCount,
      textarea,
      validation
    );
  } catch (error) {
    console.log("error char count =>", error);
    // Display a generic error message for updating character count
    showMessage(
      msgElm,
      "Error updating character count. Please try again.",
      "#ff6347"
    );
    // Return validation status indicating an error
    return { valid: false, message: "Error updating character count." };
  }
}
/**
 * Validates the tweet, checking for empty, excessive length, and other criteria.
 * Returns an object with the validity status and an error message if applicable.
 */
export function validateTweet(tweet, length) {
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
  return { valid: true, value: tweet };
}
/**
 * Adjusts the color and styles of the character count display based on tweet length and validation.
 * @param {number} currentLength - The current length of the tweet.
 * @param {number} maxLength - The maximum allowed length for the tweet.
 * @param {HTMLElement} charCount - The element displaying the character count.
 * @param {HTMLElement} textarea - The textarea element for the tweet.
 * @param {Object} validation - The validation result object containing validity status and message.
 */
function adjustStyles(
  currentLength,
  maxLength,
  charCount,
  textarea,
  validation
) {
  // Change color and adjust styles based on tweet length and validation
  if (currentLength > maxLength) {
    charCount.style.color = "red";
    textarea.style.cssText = "border-color: red;";
    // Return validation status and message
    return { valid: validation.valid, message: validation.message };
  } else if (!validation.valid) {
    // Return validation status and message if tweet is invalid
    return { valid: validation.valid, message: validation.message };
  } else {
    charCount.style.color = "rgb(107, 114, 128)";
    textarea.style.cssText = "border-color: #343435;";
    // Return validation status and validated tweet value
    return { valid: validation.valid, value: validation.value };
  }
}
export function showErrorMessage(error, msg = undefined) {
  let errorMessage = "An unexpected error occurred. Please try again.";
  let color = "#ff6347"; // Default color for unexpected errors
  if (error.response) {
    // Server responded with an error status code
    errorMessage =
      (msg ?? error.response.data.error) ||
      "Oops! Something went wrong on our end. Please try again later.";
  } else if (error.request) {
    // Request was made but no response was received
    errorMessage =
      "Network No response received from the server. Please check your internet connection.";
    color = "#f39c12"; // Orange color for network errors
  } else {
    // Error occurred while setting up the request
    errorMessage = "Request setup failed. Please try again.";
    color = "#3498db"; // Blue color for other errors
  }
  return showMessage(msgElm, errorMessage, color);
}

export class HelperRenderTweet {
  constructor(currentUser, tweet, author, originalTweet = undefined) {
    this._user = currentUser;
    this._tweet = tweet;
    this._author = author;
    this._original = originalTweet;
  }
  get userLikedTweet() {
    return this._tweet.likes.includes(this._user.userId);
  }
  /** @private */
  get _isOriginalTweet() {
    const original = this._original ? this._original : null;
    this._userIsRetweetedOriginal = original.retweeters.includes(
      this._user.userId
    );
  }

  get userRetweeted() {
    const original = this._userIsRetweetedOriginal;
    original
      ? original
      : this._tweet.retweeters.includes(this._user.userId) && this._author;
  }
}
