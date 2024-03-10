const iconElement = document.getElementById("icon-tweet");
const charCount = document.getElementById("charCount");
const maxLength = 380;
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
  const max = validator.hasMaxLength(maxLength);
  // Check tweet length
  if (!max) {
    return {
      valid: false,
      message: `Tweet exceeds maximum length of ${maxLength} characters`,
    };
  }
  return { valid: true, message: "Tweet is valid" };
}
export function updateCharCount(e) {
  const currentLength = e.target.value.length;
  const textarea = e.target
  charCount.textContent = `${currentLength}/${maxLength}`;
  // Change color if exceeding maximum limit
  if (currentLength > maxLength) {
    charCount.style.color = 'red';
    textarea.style.cssText = 'border:1px solid red'
  }else{
    charCount.style.color = 'rgb(107, 114, 128)';
    textarea.style.cssText = 'border:1px solid #343435'
  }
}
