import login from "./login.js";
import logout from "./logout.js";
import signup from "./signup.js";
const form = document.getElementById("registerForm");
signup(form)
login(form)
export { login, logout, signup };
