import { page_analyze } from "../components/profile/analyze/page__analyze.js";

export function nav_icons_profile() {
  document.querySelectorAll("[data-page]").forEach((data) => {
    const page = data.getAttribute("data-page");
    // Perform actions based on the clicked page
    switch (page) {
      case "analyze":
        // Code to handle click on analyze_page goes here
        data.addEventListener("click", handleClick);
        break;
      case "edit":
        // Code to handle click on edit_page goes here
        data.addEventListener("click", handleClick);
        break;
      case "friends":
        // Code to handle click on friends_page goes here
        data.addEventListener("click", handleClick);
        break;
      case "deleteAccount":
        // Code to handle click on deleteAccount_page goes here
        data.addEventListener("click", handleClick);
        break;
      default:
        break;
    }
  });
}

export function handleClick() {
  const profileWrapper = document.querySelector('[data-page="profile-user"]');
  const img = document.querySelector('[data-page="img-profile-user"]');
  img.style.cssText =
    "width:4rem;height:4rem;padding:0;border-width:1px;bottom:-1.5rem;cursor: pointer;";
  profileWrapper.style.cssText = `grid-template-rows: 10% minmax(90%,1fr);`;
  let oldTemplate;
  oldTemplate = document.querySelector("#userProfileContainer").innerHTML 
  img.addEventListener('click',()=>{
    img.style.cssText =
    "width:7rem;height:7rem;padding:8px;border-width:4px;bottom:-2rem;cursor: default;";
    profileWrapper.style.cssText = `grid-template-rows:30% minmax(70%,1fr);`;
    document.querySelector("#userProfileContainer").innerHTML =oldTemplate 
  })
  setTimeout(document.querySelector("#userProfileContainer").innerHTML='',200)
  const template = page_analyze()
  document.querySelector("#userProfileContainer").innerHTML=template

}
