import { HTML } from "./components/html/htmlContent.js";

// Define routes and corresponding HTML content
const routes = {
  "/home": {
    title: "Home Page",
    cssPaths: ["home.css"],
    scriptPaths: ["home.js"],
    isModule: true,
  },
};

// Function to handle route changes
function handleRouteChange() {
  const path = window.location.pathname;
  const route = routes[path];
  if (route) {
    document.body.innerHTML = HTML(route);
  } else {
    // Handle unknown routes
    document.body.innerHTML = "Page not found";
  }
}

// Event listener for route changes
window.addEventListener("popstate", handleRouteChange);

// Initial route handling
handleRouteChange();
