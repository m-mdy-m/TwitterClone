import { handleSubmit } from "./validation.js.js";
// Define a wrapper function to dynamically pass the submit URL to handleSubmit
function formHandler(event, submitUrl) {
  // Replace 'submitUrl' with the dynamic URL you want to use
  handleSubmit(event, submitUrl);
}
export default formHandler;
