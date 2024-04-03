import { BodyContent } from "./components/Body.js";

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
  if (path.startsWith("/profile")) {
    console.log('route:',route);
    document.body.innerHTML = BodyContent(route);
  } else {
    // For other routes, simply load the corresponding content
    document.body.innerHTML = BodyContent(route);
  }
} else {
  // Handle unknown routes
  document.body.innerHTML = "Page not found";
}
