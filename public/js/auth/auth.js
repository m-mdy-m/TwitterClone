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
  input.value = "";
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
  if (validationCount >= 4) {
    try {
      const formData = new FormData(form); // Collect form data
      const requestData = Object.fromEntries(formData.entries()); // Convert FormData to object
      const response = await axios.post("/signup", requestData);
      console.log("response =>", response.data);
      // Optionally, reset the form after successful submission
      form.reset();
      // Display success message to the user
      const msgSuccess = document.querySelector(".msg-success");
      msgSuccess.style.background = "#90EE90";
      // Parse JSON message and display its contents
      const message = response.data.message;
      msgSuccess.innerHTML = JSON.stringify(message); // Display JSON message
    } catch (error) {
      const msgErrorServer = document.querySelector(".msg-error-fetch");
      msgErrorServer.style.background = "#fc6736";
      msgErrorServer.innerHTML = ""; // Clear previous error messages
      const h1 = document.createElement("h1");
      msgErrorServer.appendChild(h1);
      // Handle error
      if (error.response) {
        const errorMessage = error.response.data.error;
        const formData = error.response.data.data;
        h1.innerHTML = errorMessage;
        // Set form values based on the data received from the server
        for (const [name, value] of Object.entries(formData)) {
          const input = form.querySelector(`[name="${name}"]`);
          if (input) {
            input.value = value;
          }
        }
      } else if (error.request) {
        // The request was made but no response was received
        h1.innerHTML = "No response received from server";
      } else {
        // Something happened in setting up the request that triggered an error
        (h1.innerHTML = "Error occurred during request setup"), error.message;
      }
    }
  }
});
