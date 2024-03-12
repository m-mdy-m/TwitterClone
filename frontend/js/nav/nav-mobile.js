import { renderNavMenu,renderNavMobile } from "./navigation.js";

const navMobile = document.getElementById("nav-mobile");
const shouldDisplayWelcomePhoto = localStorage.getItem("showWelcomePhoto");
const isAuth = localStorage.getItem("logged");
renderNavMenu(isAuth);
renderNavMobile(isAuth);

if (shouldDisplayWelcomePhoto) {
  document.querySelectorAll(".welcome-user").forEach((el) => {
    el.style.display = "block";
  });
  // Optionally, set an expiry for the flag after 10 minutes
  setTimeout(() => {
    localStorage.removeItem("showWelcomePhoto");
    document.querySelectorAll(".welcome-user").forEach((el) => {
      el.style.display = "none";
    });
  }, 10 * 60 * 1000); // 10 minutes
} else {
  document.querySelectorAll(".welcome-user").forEach((el) => {
    el.style.display = "none";
  });
}
// Function to handle navigation events
function handleNavigation() {
  const iconNavigation = document.getElementById("iconNavigation");
  const cancelIcon = document.getElementById("cancelIcon");

  // Add event listener to the navigation icon to open the mobile navigation
  iconNavigation.addEventListener("click", () => {
    navMobile.classList.remove("hide-nav");
    navMobile.classList.add("show-nav");
  });

  // Add event listener to the cancel icon to close the mobile navigation
  cancelIcon.addEventListener("click", () => {
    navMobile.classList.add("hide-nav");
    navMobile.classList.remove("show-nav");
  });

  // Add event listener to close the mobile navigation if clicked outside of it
  document.addEventListener("click", (event) => {
    if (
      !navMobile.contains(event.target) &&
      !iconNavigation.contains(event.target) &&
      window.innerWidth < 900
    ) {
      navMobile.classList.add("hide-nav");
      navMobile.classList.remove("show-nav");
    }
  });
}

// Initial call to handle navigation events
handleNavigation();

// Call the function whenever the window is resized
window.addEventListener("resize", () => {
  if (window.innerWidth < 900) {
    handleNavigation();
  } else {
    navMobile.classList.remove("show-nav");
    navMobile.classList.remove("hide-nav");
  }
});
