const navMobile = document.getElementById("nav-mobile");
const iconNavigation = document.getElementById("iconNavigation");
const cancelIcon = document.getElementById("cancelIcon");

// Hide the mobile navigation initially
navMobile.style.width = "0";

// Add event listener to the navigation icon to open the mobile navigation
iconNavigation.addEventListener("click", () => {
  navMobile.style.width = "100%";
});

// Add event listener to the cancel icon to close the mobile navigation
cancelIcon.addEventListener("click", () => {
  navMobile.style.width = "0";
});
