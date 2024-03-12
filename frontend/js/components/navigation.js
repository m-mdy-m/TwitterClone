



const navMenu = document.getElementById("nav-menu-template");
const navMobile = document.getElementById("nav-mobile-template");
export function renderNavMenu(isAuth) {
  if (isAuth) {
    navMenu.innerHTML = authTemplateMenu;
  } else {
    navMenu.innerHTML = defaultTemplateMenu;
  }
}

export function renderNavMobile(isAuth) {
  if (isAuth) {
    navMobile.innerHTML = authTemplateMobile;
  } else {
    navMobile.innerHTML = defaultTemplateMobile;
  }
}
