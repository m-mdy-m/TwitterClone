const navMobile = document.getElementById("nav-mobile");
const iconNavigation = document.getElementById("iconNavigation");
const cancelIcon = document.getElementById("cancelIcon");
if (window.innerWidth < 900) {
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
      if (!navMobile.contains(event.target) && !iconNavigation.contains(event.target)) {
          navMobile.classList.add("hide-nav");
          navMobile.classList.remove("show-nav");
      }
  });
}
