const navMobile = document.getElementById("nav-mobile");
const iconNavigation = document.getElementById("iconNavigation");
const cancelIcon = document.getElementById("cancelIcon");
// Add event listener to the navigation icon to open the mobile navigation
iconNavigation.addEventListener("click", () => {
  navMobile.classList.add("show-nav-mobile");
});

// Add event listener to the cancel icon to close the mobile navigation
cancelIcon.addEventListener("click", () => {
  navMobile.classList.remove("show-nav-mobile");
});
