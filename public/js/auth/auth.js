import axios from 'axios';
const mainUrl = "http://localhost:3000/";
const formGroup = document.querySelectorAll(".form-group");
const form = document.getElementById("registerForm");
const msgErrors = document.querySelectorAll(".msg-error");
const validColor = "#90EE90";
const invalidColor = "#d04848";
let passwordField;
let validationCount = 0;

function incrementValidations(isValid) {
  validationCount += isValid ? 1 : -1;
}
function handleErrorMessage(name, msg, input, errorMessageElement) {
  const setBackgroundAndMessage = (color, message) => {
    input.style.backgroundColor = color;
    errorMessageElement.innerHTML = message;
    if (!message) {
      errorMessageElement.style.background = "transparent";
    }
  };
  switch (name) {
    case "username":
    case "email":
    case "password":
    case "passwordConf":
      setBackgroundAndMessage(msg ? invalidColor : validColor, msg);
      break;
  }
}
formGroup.forEach((forms) => {
  const input = forms.querySelector("input");
  const errorMessageElement = forms.querySelector("i");
  errorMessageElement.style.background = "transparent";
  input.addEventListener("input", () => {
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
      }
    } catch (error) {
      errorMessage = error.message;
    }
    handleErrorMessage(name, errorMessage, input, errorMessageElement);
  });
});
form.addEventListener("submit", (e) => {
  e.preventDefault();
  if (validationCount >= 6) {
    axios.post(mainUrl+"/signup",{
        
    })
  }
});
