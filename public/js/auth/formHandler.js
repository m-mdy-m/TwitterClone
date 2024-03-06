import { handleSubmit } from "./validation.js";
let submitUrl;
function getUrl(url) {
  submitUrl = url;
}
// Define a wrapper function to dynamically pass the submit URL to handleSubmit
function formHandler(event) {
  // Replace 'submitUrl' with the dynamic URL you want to use
  console.log('submitUrl=>',submitUrl);
  return handleSubmit(event, submitUrl);
}
export { formHandler, getUrl };
