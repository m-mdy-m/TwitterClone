import { authPage } from "./auth.js";
import Header from "./components/common/header.js";
import { HomePage } from "./home.js";
import { initializeComponentsNavigation } from "./nav/navigation-handler.js";
import { getUserInfo } from "./utils/apiOperations.js";
import { getPath, isAuth } from "./utils/utils.js";
const path = getPath();
const loader = document.getElementById("loader");
document.addEventListener("DOMContentLoaded", async () => {
  loader.style.display = "none";
  if(isAuth()){
    if('/home'.includes(path)){
        HomePage()
    }
    const header = document.querySelector("header");
    const { username, profilePic } = await getUserInfo();
    header.innerHTML = Header({ profile: profilePic, username });
    initializeComponentsNavigation();
  }
  if(["/auth/signup", "/auth/login"].includes(path)){
    authPage()
  }
});
