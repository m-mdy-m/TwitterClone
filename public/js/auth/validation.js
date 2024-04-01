// Constants for valid and invalid colors
const validColor = "#2c713a";
const invalidColor = "#9e3636";
let passwordField;
// Select all form groups
const formGroup = document.querySelectorAll(".form-group");
// Initialize validation count
export let validationCount = 0;
// Function to validate input fields
function validateInput(input, errorMessageElement) {
  // Extract input name and initialize variables
  let name = input.name,
    isValid,
    errorMessage = null;

  try {
    // Set background color for error message element
    errorMessageElement.style.background = "#ff004ca1";
    // Validate input based on input name
    switch (name) {
      case "username":
        isValid = vfyjs.isUsername(input);
        incrementValidations(isValid);
        break;
      case "email":
        isValid = vfyjs.isEmail(input);
        incrementValidations(isValid);
        break;
      case "password":
        passwordField = input.value;
        isValid = vfyjs.isPassword(input);
        incrementValidations(isValid);
        break;
      case "passwordConf":
        let Confirm = input.value;
        isValid = Confirm === passwordField;
        if (!errorMessage) {
          errorMessage = "password do not match";
        }
        if (isValid && errorMessage) {
          errorMessage = null;
          validationCount++;
        }
      default:
        break;
    }
  } catch (error) {
    errorMessage = error;
  }
  // Handle error message and background color
  handleErrorMessage(name, errorMessage, input, errorMessageElement);
}
// Function to increment validation count
function incrementValidations(isValid) {
  return (validationCount += isValid ? 1 : -1);
}
// Function to set background color and error message
function setBackgroundAndMessage(input, errorMessageElement, color, message) {
  input.style.backgroundColor = color;
  errorMessageElement.innerHTML = message;
  if (!message) {
    errorMessageElement.style.background = "transparent";
  }
}
// Function to handle error message
function handleErrorMessage(name, msg, input, errorMessageElement) {
  switch (name) {
    case "username":
    case "email":
    case "password":
    case "passwordConf":
      setBackgroundAndMessage(
        input,
        errorMessageElement,
        msg ? invalidColor : validColor,
        msg
      );
      break;
  }
}
// Handler function for input event
function handleInputEvent(event) {
  const input = event.target;
  const errorMessageElement = input.nextElementSibling;
  errorMessageElement.style.background = "transparent";
  errorMessageElement.style.opacity = "1";
  validateInput(input, errorMessageElement);
}
// Function to handle form validation
export function handleFormValidation() {
  formGroup.forEach((forms) => {
    const input = forms.querySelector("input");
    input.value = "";
    input.addEventListener("input", handleInputEvent);
  });
}
