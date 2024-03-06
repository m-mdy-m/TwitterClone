import login from "./login.js";
import logout from "./logout.js";
import signup from "./signup.js";
const logoutButton = document.querySelector(".logout");
const form = document.getElementById("registerForm");
signup(form);
login(form);
logout(logoutButton);
