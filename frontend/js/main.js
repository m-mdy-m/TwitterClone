import { HTML } from "./components/html/htmlContent.js";

// Define routes and corresponding HTML content
const routes = {
  "/home": {
    title: "Home Page",
    cssPaths: "",
    scriptPaths: ["nav/nav-mobile.js"],
    isModule: true,
  },
};

console.log("hi");
// Function to handle route changes
function handleRouteChange() {
  const path = window.location.pathname;
  const route = routes[path];
  if (route) {
    console.log("hi");
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
