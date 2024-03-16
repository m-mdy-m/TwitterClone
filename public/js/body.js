import { BodyContent } from "./components/Body.js";
const isAuth = localStorage.getItem("logged");
// Define routes and corresponding HTML content
const routes = {
  "/home": {
    isAuth,
    classMain: "grid grid-cols-main",
    classMsgError: "absolute top-4 left-[25%]",
    height: "full",
  },
  "/auth/signup": {
    isAuth,
  },
  "/auth/login": {
    isAuth,
  },
};
const path = window.location.pathname;
const route = routes[path];
if (route) {
  document.body.innerHTML = BodyContent(route);
} else {
  // Handle unknown routes
  document.body.innerHTML = "Page not found";
}
