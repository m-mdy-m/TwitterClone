const navMobile = document.getElementById("nav-mobile");
const iconNavigation = document.getElementById("iconNavigation");
const cancelIcon = document.getElementById("cancelIcon");
cancelIcon.addEventListener("click", () => {
  navMobile.style.cssText = 'display:none'
});
iconNavigation.addEventListener("click", () => {
    iconNavigation.style.cssText = 'display:flex'
});
