const navMobile = document.getElementById("nav-mobile");
const iconNavigation = document.getElementById("iconNavigation");
const cancelIcon = document.getElementById("cancelIcon");
// Add event listener to the navigation icon to open the mobile navigation
iconNavigation.addEventListener("click", () => {
  navMobile.style.cssText = `
    width: 66.666667%;
    height:100%;
    display: block !important;
    transition: all 2s;
    left:0;
    `;
});

// Add event listener to the cancel icon to close the mobile navigation
cancelIcon.addEventListener("click", () => {
  navMobile.style.cssText = `
    width: 0;
    height:100%;
    transition: all 2s;
    left: -15rem;
    `;
  setTimeout(() => {
    navMobile.style.display = "none";
    navMobile.style.height = "0";
  }, 2000);
});
