import { ProfilePage } from "./profile/ProfilePage.js";
import { LoginForm, SignupForm } from "./form/FormHandler.js";
import { HOME } from "./main/Home.js"
let currentPage = window.location.pathname
export function mainContent() {
    if (currentPage === '/home') {
        return HOME({ username: "m__mdy__m", profilePic: '/assets/images/profilePic.png', profileStory: "/assets/icon/nav/user.svg" });
    } else if (currentPage === '/auth/login') {
        return LoginForm();
    } else if (currentPage === '/auth/signup') {
        return SignupForm();
    } else if (currentPage.startsWith('/profile/')) {
        return ProfilePage();
    } else {
        return "";
    }
}