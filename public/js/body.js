import { BodyContent } from "./components/Body.js";

// Define routes and corresponding HTML content
const routes = {
  "/home": {
    style_main: "grid grid-cols-main bg-gradient-main mt-4 mr-4 mb-4 ",
    style_error: "fixed top-4 left-[40%]",
    height: "full",
  },
  "/auth/signup": {},
  "/auth/login": {},
  "/profile": {},
};
const path = window.location.pathname;
const route = routes[path];
if (route) {
  document.body.innerHTML = BodyContent(route);
} else {
  // Handle unknown routes
  document.body.innerHTML = "Page not found";
}
