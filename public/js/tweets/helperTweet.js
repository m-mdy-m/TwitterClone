export function showUserRetweeted(){
    document.querySelectorAll(".container__profile-users").forEach((elm) => {
        const profile = elm.querySelector(".profile-user");
        const userRetweeted = elm.querySelector(".user-retweeted");
  
        profile.addEventListener("mouseenter", () => {
          userRetweeted.classList.remove("hiddenId");
          userRetweeted.classList.add("visibleId");
        });
       
  
        profile.addEventListener("mouseleave", () => {
          setTimeout(() => {
            userRetweeted.classList.remove("visibleId");
            userRetweeted.classList.add("hiddenId");
          }, 1500);
        });
      });
}