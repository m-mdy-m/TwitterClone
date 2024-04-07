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
          console.log("Clicked on analyze_page");
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
  