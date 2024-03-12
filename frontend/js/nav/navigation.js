import { HeaderNavigation } from "../components/navigation/header.js";
import { MobileNavigation } from "../components/navigation/mobile.js";
export function renderNavMenu(isAuth) {
  const navMenu = document.getElementById("nav-menu-template");
  const navMenuContent = HeaderNavigation({ isAuth });
  navMenu.innerHTML = navMenuContent;
}

export function renderNavMobile(isAuth) {
  const navMobile = document.getElementById("nav-mobile-template");
  const navMobileContent = MobileNavigation({ isAuth });
  navMobile.innerHTML = navMobileContent;
}
