import { getCsrfToken } from "./utils.js";

async function handler(){
  try {
    const csrfToken = await getCsrfToken(); 
    const response = await axios.post("/auth/logout", {}, {
      headers: {
        'X-CSRF-Token': csrfToken // Include CSRF token in request headers
      }
    });
    console.log("Logout response:", response);
    // Optionally, perform additional actions after logout
  } catch (error) {
    console.error("Logout error:", error);
  }
}
function logout(button) {
  
  button.addEventListener("click", handler);
}
export default logout;
