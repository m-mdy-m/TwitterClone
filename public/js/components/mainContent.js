import { ProfilePage } from "./profile/ProfilePage.js";
import { LoginForm, SignupForm } from "./form/FormHandler.js";
import { HOME } from "./main/Home.js";

const routes = {
    '/home': () => HOME(),
    '/auth/login': () => LoginForm(),
    '/auth/signup': () => SignupForm(),
};

function getRouteHandler() {
    const { pathname } = window.location;
    if (pathname.startsWith('/profile')) {
        return ProfilePage;
    }
    return routes[pathname] || (() => "");
}

export function mainContent() {
    const routeHandler = getRouteHandler();
    return routeHandler();
}
