import getCSRFToken, { getMsgElement, getToken } from "./utils.js";

const msgElm = getMsgElement()
const iconElement = document.getElementById("icon-tweet");
const charCount = document.getElementById("charCount");
const maxLength = 300;

// Function to handle unsuccessful form submission
export function handleNotSuccess(data) {
  // Add error message styling to message element
  msgElm.classList.add("msg-errors");
  // Extract error message from server response data
  const message = data.message;
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
// get Id Tweet from element
export function getId(el) {
  return el.parentNode.parentNode.parentNode.parentNode.getAttribute("data-id");
}
export async function getCSRFHeader() {
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
  const token = getToken();
  
  
  // Construct headers object including CSRF token and JWT token
  const header = {
    headers: {
      "X-CSRF-Token": csrfToken,
      Authorization: `Bearer ${token}`
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