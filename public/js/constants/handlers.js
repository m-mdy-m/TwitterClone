
const iconElement = document.getElementById("icon-tweet");
// Function to hide the icon when textarea is focused
export function hideIconOnFocus() {
  iconElement.style.opacity = 0;
}

// Function to show the icon when textarea loses focus
export function showIconOnBlur() {
  iconElement.style.opacity = 1;
}
export function keypress(e){
  const value = e.target.value
  const trimmed = vfyjs.trimValue(value)
  console.log('trimmed=>',trimmed);
  const validator = vfyjs.inputValidations(trimmed)
  const a = validator.hasAlphanumeric()
  console.log('a=>',a);
}