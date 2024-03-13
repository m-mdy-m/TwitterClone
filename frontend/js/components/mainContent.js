import { LoginForm, SignupForm } from "./form/FormHandler";
import { HOME } from "./main/Home.j"
let currentPage = window.location.pathname
export function mainContent(){
    switch(currentPage){
        case '/home':
            return HOME({ username:"m__mdy__m", profilePic: '/assets/images/profilePic.png', profileStory: "/assets/icon/nav/user.svg" });
        case '/auth/login':
            return LoginForm()
        case '/auth/signup':
            return SignupForm()
        default :
            return ""
    
    }
}