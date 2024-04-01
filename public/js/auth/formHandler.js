import { handleSubmit } from "./fetchUser.js";

// Define form handler function
function formHandler(form, submitUrl) {
  // Add event listener to the form
  form.addEventListener("submit", (event) => {
    // Prevent default form submission
    event.preventDefault();
    // Pass the form submission event and submit URL to the submit handler
    handleSubmit(event, submitUrl);
  });
}

export { formHandler };
