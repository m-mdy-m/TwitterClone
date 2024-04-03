import { ProfilePage } from "./profile/ProfilePage.js";
import { LoginForm, SignupForm } from "./form/FormHandler.js";
import { HOME } from "./main/Home.js";

const routes = {
    '/home': () => HOME({ username: "m__mdy__m", profilePic: '/assets/images/profilePic.png', profileStory: "/assets/icon/nav/user.svg" }),
    '/auth/login': () => LoginForm(),
    '/auth/signup': () => SignupForm(),
    '/profile/': () => ProfilePage(),
};

export function mainContent() {
    const routeHandler = routes[window.location.pathname] || (() => "");
    return routeHandler();
}
