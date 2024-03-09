const navMobile = document.getElementById("nav-mobile");
const iconNavigation = document.getElementById("iconNavigation");
const cancelIcon = document.getElementById("cancelIcon");
iconNavigation.addEventListener("click", () => {
    navMobile.classList.add("show-nav-mobile");
});

cancelIcon.addEventListener("click", () => {
    navMobile.classList.remove("show-nav-mobile");
    navMobile.classList.add("hide-nav-mobile");
});
