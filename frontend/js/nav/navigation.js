const { HeaderNavigation } = require("../components/navigation/header");
const { MobileNavigation } = require("../components/navigation/mobile");
const navMenu = document.getElementById("nav-menu-template");
const navMobile = document.getElementById("nav-mobile-template");
export function renderNavMenu(isAuth) {
  const navMenuContent = HeaderNavigation({ isAuth });
  navMenu.innerHTML = navMenuContent;
}

export function renderNavMobile(isAuth) {
  const navMobileContent = MobileNavigation({ isAuth });
  navMobile.innerHTML = navMobileContent;
}
