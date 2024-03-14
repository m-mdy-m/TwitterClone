import { BodyContent } from "./components/Body.js";
const isAuth = localStorage.getItem("logged");
// Define routes and corresponding HTML content
const routes = {
  "/home": {
    isAuth,
    profile: "/assets/images/profilePic.png",
    username: "m__mdy__m",
    classMain: "grid grid-cols-main",
  },
  "/auth/signup": {
    isAuth,
    profile: "/assets/images/profilePic.png",
    username: "m__mdy__m",
    classMain: "flex justify-center items-center",
  },
  "/auth/login": {
    isAuth,
    profile: "/assets/images/profilePic.png",
    username: "m__mdy__m",
    classMain: "flex justify-center items-center",
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
