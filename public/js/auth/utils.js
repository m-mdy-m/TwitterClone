const validColor = "#90EE90";
const invalidColor = "#d04848";
const formGroup = document.querySelectorAll(".form-group");
export let validationCount = 0;
function validateInput(input, errorMessageElement) {
  let name = input.name,
    isValid,
    errorMessage = null;

  try {
    errorMessageElement.style.background = "#ff004ca1";
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
    errorMessage = error.message;
  }
  setBackgroundAndMessage(input,errorMessageElement,)
  // handleErrorMessage(name, errorMessage, input, errorMessageElement,errorMessage ? invalidColor : validColor,);
}

function incrementValidations(isValid) {
  return (validationCount += isValid ? 1 : -1);
}
function setBackgroundAndMessage(input, errorMessageElement, color, message) {
  input.style.backgroundColor = color;
  errorMessageElement.innerHTML = message;
  if (!message) {
    errorMessageElement.style.background = "transparent";
  }
}
// function handleErrorMessage(name, msg, input, errorMessageElement) {
//   switch (name) {
//     case "username":
//     case "email":
//     case "password":
//     case "passwordConf":
//       setBackgroundAndMessage(input,errorMessageElement,msg ? invalidColor : validColor, msg);
//       break;
//   }
// }
let passwordField;
function handleInputEvent(event) {
  const input = event.target;
  const errorMessageElement = input.nextElementSibling;
  errorMessageElement.style.background = "transparent";
  validateInput(input, errorMessageElement);
}
export function handleFormValidation() {
  formGroup.forEach((forms) => {
    const input = forms.querySelector("input");
    input.value = "";
    // const errorMessageElement = forms.querySelector("i");
    // errorMessageElement.style.background = "transparent";
    input.addEventListener("input", handleInputEvent);
  });
}
