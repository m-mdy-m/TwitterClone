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
form.addEventListener("submit", async (e) => {
  e.preventDefault();
  const msgErrorServer = document.querySelector(".msg-error-fetch");
  msgErrorServer.style.background = "#fc6736";
  msgErrorServer.innerHTML = ""; // Clear previous error messages
  if (validationCount >= 4) {
    try {
      const formData = new FormData(form); // Collect form data
      const requestData = Object.fromEntries(formData.entries()); // Convert FormData to object
      const response = await axios.post("/signup", requestData);
      console.log("response =>", response.data);
      // Optionally, reset the form after successful submission
      form.reset();
    } catch (error) {
      const h1 = document.createElement("h1");
      if (error) {
        msgErrorServer.appendChild(h1);
      }
      // Handle error
      if (error.response) {
        // The request was made and the server responded with a status code
        // that falls out of the range of 2xx
        h1.innerHTML =
          ("Server responded with error status:", error.response.status);
        h1.innerHTML = ("Error data:", error.response.data);
        // Display error message to the user
        h1.innerHTML = "Server error occurred. Please try again later.";
      } else if (error.request) {
        // The request was made but no response was received
        h1.innerHTML = ("No response received from server:", error.request);
        // Display error message to the user
        h1.innerHTML =
          "No response received from server. Please check your internet connection.";
      } else {
        // Something happened in setting up the request that triggered an error
        h1.innerHTML = ("Error occurred during request setup:", error.message);
        // Display error message to the user
        h1.innerHTML =
          "Error occurred during request setup. Please try again later.";
      }
    }
  }
});
