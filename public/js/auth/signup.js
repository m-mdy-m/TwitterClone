import { handleSubmit } from "./validation.js";
// Define a wrapper function to dynamically pass the submit URL to handleSubmit
function handleFormSubmit(event) {
  // Replace 'submitUrl' with the dynamic URL you want to use
  const submitUrl = "/auth/signup";
  handleSubmit(event, submitUrl);
}
export default handleFormSubmit;
