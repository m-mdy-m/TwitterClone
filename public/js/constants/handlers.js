
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
  const value = e.target.value;
  // Trim the input value
  const trimmed = vfyjs.trimValue(value);
  // Perform input validations
  const validator = vfyjs.inputValidations(trimmed);
  validator.hasAlphanumeric();
  validator.hasAlphabetic();
}