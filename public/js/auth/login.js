import { handleFormValidation } from "./utils.js";
const form = document.getElementById("registerForm");
let count;
handleFormValidation().then((count) => {
    console.log('Validation count =>', count);
  });
form.addEventListener("submit", async (e) => {
  console.log("count +>", count);
  e.preventDefault();
  if (count >= 4) {
    try {
      const formData = new FormData(form); // Collect form data
      const requestData = Object.fromEntries(formData.entries()); // Convert FormData to object
      const response = await axios.post("/login", requestData);
      // Optionally, reset the form after successful submission
      form.reset();
      // Display success message to the user
      const msgSuccess = document.querySelector(".msg-success");
      msgSuccess.style.background = "#90EE90";
      // Parse JSON message and display its contents
      const message = response.data.message;
      msgSuccess.innerHTML = message; // Display JSON message
      window.location.href = "/"; // redirected
    } catch (error) {
      const msgErrorServer = document.querySelector(".msg-error-fetch");
      msgErrorServer.style.background = "#fc6736";
      msgErrorServer.innerHTML = ""; // Clear previous error messages
      const h1 = document.createElement("h1");
      msgErrorServer.appendChild(h1);
      // Handle error
      if (error.response) {
        const errorMessage = error.response.data.error;
        const formData = error.response.data.validationErrors;
        h1.innerHTML = errorMessage;
        if (formData) {
          // Set form values based on the data received from the server
          for (const [name, value] of Object.entries(formData)) {
            const input = form.querySelector(`[name="${name}"]`);
            if (input) {
              input.value = value;
            }
          }
        }
      } else if (error.request) {
        // The request was made but no response was received
        h1.innerHTML = "No response received from server";
      } else {
        // Something happened in setting up the request that triggered an error
        h1.innerHTML = "Error occurred during request setup" + error.message;
      }
    }
  }
});
