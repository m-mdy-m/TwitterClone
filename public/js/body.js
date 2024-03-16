import { BodyContent } from "./components/Body.js";
// Define routes and corresponding HTML content
const routes = {
  "/home": {
    classMain: "grid grid-cols-main",
    classMsgError: "absolute top-4 left-[25%]",
    height: "full",
  },
  "/auth/signup": {},
  "/auth/login": {},
};
const path = window.location.pathname;
const route = routes[path];
if (route) {
  document.body.innerHTML = BodyContent(route);
} else {
  // Handle unknown routes
  document.body.innerHTML = "Page not found";
}
