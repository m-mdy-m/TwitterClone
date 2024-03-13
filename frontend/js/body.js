import { BodyContent } from "./components/Body.js";
const isAuth = localStorage.getItem("logged");
// Define routes and corresponding HTML content
const routes = {
  "/home": {
    isAuth,
    profile: "/assets/images/profilePic.png",
    username: "m__mdy__m",
  },
};

// Function to handle route changes
function handleRouteChange() {
  const path = window.location.pathname;
  const route = routes[path];
  if (route) {
    document.body.innerHTML = BodyContent(route);
  } else {
    // Handle unknown routes
    document.body.innerHTML = "Page not found";
  }
}

// Event listener for route changes
window.addEventListener("popstate", handleRouteChange);
window.addEventListener("DOMContentLoaded", handleRouteChange);

// Initial route handling
handleRouteChange();
