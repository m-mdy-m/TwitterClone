import { displayMessage } from "./validation.js";
const msgElm = document.getElementById("msgElm");
async function handler(){
  try {
    // Fetch CSRF token from a hidden input field in your HTML
    const csrfToken = document.querySelector('input[name="_csrf"]').value;
    // Include CSRF token in the request headers
    const headers = {
      'X-CSRF-TOKEN': csrfToken
    };
    const response = await axios.post("/auth/logout", {}, { headers });
    // Check if the response is successful
    if (response.status === 200 && response.data.success) {
      window.location.href ='/auth/login'
      // Optionally, perform additional actions after logout
    } else {
      msgElm.classList.add('msg-errors')
      const message = response.data.message
      displayMessage(msgElm,message,'#944E63')
    }
  } catch (error) {
    msgElm.classList.add('msg-errors')
    msgElm.innerHTML = "";
    const message = error.response.data.error
    displayMessage(msgElm, message, "#fc6736");
  }
}
function logout(button) {
  if (button) {
    button.addEventListener("click", handler);
  }
}
export default logout;
