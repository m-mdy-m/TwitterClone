const iconElement = document.getElementById("icon-tweet");
// Function to hide the icon when textarea is focused
export function hideIconOnFocus() {
  iconElement.style.opacity = 0;
}

// Function to show the icon when textarea loses focus
export function showIconOnBlur() {
  iconElement.style.opacity = 1;
}
// Function to validate input value on keypress
export function validateInput(e) {
  const tweet = e.target.value;
  const validation = validateTweet(tweet);
  if (!validation.valid) {
    
  }
}
export function validateTweet(tweet) {
  const trimmed = vfyjs.trimValue(tweet);
  const validator = vfyjs.inputValidations(trimmed);
  const maxLength = validator.hasMaxLength(280);
  console.log('mav =>',maxLength);
  // Check tweet length
  if (!maxLength) {
    return {
      valid: false,
      message: `Tweet exceeds maximum length of ${280} characters`,
    };
  }
  return { valid: true, message: "Tweet is valid" };
}
