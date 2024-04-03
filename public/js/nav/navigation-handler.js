import { attachLogoutHandler } from "../auth/logout.js";
import { BodyContent } from "../components/Body.js";
import { getProfileUser } from "../utils/apiOperations.js";
import { clearWelcomePhotoFlag, showWelcome } from "../utils/utils.js";
// Function to handle navigation events
function handleNavigation() {
  const navMobile = document.getElementById("nav-mobile");
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
// Function to execute components on document load
export function initializeComponentsNavigation() {
  const showWelcomePhotoFlag = showWelcome();

  // Initialize logout functionality
  const btnLogout = document.querySelector(".logout");
  attachLogoutHandler(btnLogout);

  // Handle navigation events
  handleNavigation();
  const wrapper = document.querySelector(".userProfileWrapper");
  wrapper.addEventListener("click", async () => {
    const usernameElement = wrapper.querySelector(".username");
    const username = usernameElement ? usernameElement.innerHTML : null;

    if (!username) {
      console.error("Username element not found");
      return;
    }
    try {
      const response = await getProfileUser(username);
      
      if (response.success) {
        // Redirect to the profile page if the username matches
        window.location.href = `./profile/${username}`;
      } else {
        // Display an error message or handle the error as needed
        console.error("Error:", response.error);
      }
    } catch (error) {
      console.error("Error:", error);
    }
    document.body.innerHTML = BodyContent();
  });

  // Optionally display welcome photo
  if (showWelcomePhotoFlag) {
    document.querySelectorAll(".welcome-user").forEach((el) => {
      el.style.display = "block";
    });
    // Optionally, set an expiry for the flag after 10 minutes
    setTimeout(() => {
      clearWelcomePhotoFlag();
      document.querySelectorAll(".welcome-user").forEach((el) => {
        el.style.display = "none";
      });
    }, 10 * 60 * 1000); // 10 minutes
  } else {
    document.querySelectorAll(".welcome-user").forEach((el) => {
      el.style.display = "none";
    });
  }

  // Call the function whenever the window is resized
  window.addEventListener("resize", () => {
    const navMobile = document.getElementById("nav-mobile");
    if (window.innerWidth < 900) {
      handleNavigation();
    } else {
      navMobile.classList.remove("show-nav");
      navMobile.classList.remove("hide-nav");
    }
  });
}
