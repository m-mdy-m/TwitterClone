import axios from "axios";
const mainUrl = "http://localhost:3000/";
const form = document.getElementById("registerForm");
const formInputs = Array.from(document.querySelectorAll(".form-group input"));
const validColor = "#90EE90";
const invalidColor = "#d04848";
let passwordField;
let validInputCount = 0;

// Function to validate inputs and update error messages
function validateInput(input, errorMessage) {
  let isValid = true;
  let message = null;

  switch (input.name) {
    case "username":
      isValid = vfyjs.isUsername(input);
      break;
    case "email":
      isValid = vfyjs.isEmail(input);
      break;
    case "password":
      passwordField = input.value;
      isValid = vfyjs.isPassword(input);
      break;
    case "passwordConf":
      const confirmPassword = input.value;
      isValid = confirmPassword === passwordField;
      if (!isValid) {
        message = "Passwords do not match";
      }
      break;
  }

  if (isValid) {
    validInputCount++;
    input.style.backgroundColor = validColor;
    errorMessage.innerHTML = null;
  } else {
    input.style.backgroundColor = invalidColor;
    errorMessage.innerHTML = message;
  }
}

// Function to handle form submission
function handleSubmit(event) {
  event.preventDefault();
  if (validInputCount >= 8) {
    const formData = new FormData(form);
    const userData = Object.fromEntries(formData.entries());

    axios
      .post(mainUrl + "/signup", userData)
      .then((response) => {
        // Handle successful form submission response
        console.log(response.data);
      })
      .catch((error) => {
        // Handle error during form submission
        console.error("Error:", error);
      });
  }
}
function handleErrorMessage(name, msg, input, i) {
  const isMsg = (msg, i) => {
    if (msg) {
      input.style.backgroundColor = invalid;
      i.innerHTML = msg;
    } else {
      input.style.backgroundColor = valid;
      i.innerHTML = null;
      i.style.background = "transparent";
    }
  };
  switch (name) {
    case "username":
    case "email":
    case "password":
    case "passwordConf":
      isMsg(msg, i);
      break;
  }
}
// Event listeners for form inputs
formInputs.forEach((input) => {
  const errorMessage = input.nextElementSibling;
  input.addEventListener("input", () => {
    validateInput(input, errorMessage);
  });
});
form.addEventListener("submit", handleSubmit);
