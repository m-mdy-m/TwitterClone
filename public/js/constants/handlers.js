const iconElement = document.getElementById("icon-tweet");
// Function to hide the icon when textarea is focused
export function hideIconOnFocus() {
  iconElement.style.opacity = 0;
}

// Function to show the icon when textarea loses focus
export function showIconOnBlur() {
  iconElement.style.opacity = 1;
}
