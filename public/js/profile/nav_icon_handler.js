export function nav_icons_profile() {
  const profileContainer = document.querySelector(".nav__profile-user");

  profileContainer.addEventListener("click", (event) => {
    const targetIcon = event.target.closest("[data-page]");
    if (!targetIcon) return;

    const page = targetIcon.dataset.page;
    // Perform actions based on the clicked page
    switch (page) {
      case "analyze":
        // Code to handle click on analyze_page goes here
        targetIcon.addEventListener("click",handleClick)
        break;
      case "edit":
        // Code to handle click on edit_page goes here
        console.log("Clicked on edit_page");
        break;
      case "friends":
        // Code to handle click on friends_page goes here
        console.log("Clicked on friends_page");
        break;
      case "deleteAccount":
        // Code to handle click on deleteAccount_page goes here
        console.log("Clicked on deleteAccount_page");
        break;
      default:
        break;
    }
  });
}

export function handleClick() {
    const profileWrapper = document.querySelector('[data-page="profile-user"]');
    const img = document.querySelector('[data-page="img-profile-user"]');
    img.style.cssText = 'width:4rem;height:4rem;padding:0;border-width:1px;bottom:-1.5rem;'
    profileWrapper.style.cssText = `grid-template-rows: 10% minmax(90%,1fr);`
}
