import { page_analyze } from "../components/profile/analyze/page__analyze.js";
import { handlerChart } from "./analyze/helper__chart.js";

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
  img.addEventListener("click", () => {
    img.style.cssText =
      "width:7rem;height:7rem;padding:8px;border-width:4px;bottom:-2rem;cursor: default;";
    profileWrapper.style.cssText = `grid-template-rows:30% minmax(70%,1fr);`;
  });
  setTimeout(
    (document.querySelector("#userProfileContainer").innerHTML = ""),
    200
  );
  Analyze();
}
export function Analyze() {
  const template = page_analyze();
  document.querySelector("#userProfileContainer").innerHTML = template;
  new handlerChart();
  const wrapperChart = document.querySelector("[data-chart]");
  const parent = wrapperChart.querySelector("div");
  const buttons = wrapperChart.querySelectorAll("button");
  // Button click event listener
  wrapperChart.addEventListener("click", (e) => {
    // Delay button animation to avoid rendering issues
    setTimeout(() => {
      buttons.forEach((btn, index) => {
        const delay = index * 20;
        const translateY = delay * 1.2;

        setTimeout(() => {
          parent.style.cssText = "min-height: 5rem; transition: 1s all;";
          btn.style.cssText = `transform: translateY(${translateY}px); opacity: 1; transition: 1.5s all;`;

          btn.addEventListener("mouseenter", () => {
            btn.style.transform = `translateY(${translateY - 2}px)`;
          });

          btn.addEventListener("mouseleave", () => {
            btn.style.transform = `translateY(${translateY}px)`;
          });
        }, delay);
      });
    }, 400);
    const target = e.target;
    if (target.matches('[data-chart-week]')) {
        const week = target.matches("[data-chart-week]")
    }
    if (target.matches('[data-chart-month]')) {
        const month = target.matches("[data-chart-month]")
    }
    if (target.matches('[data-chart-year]')) {
        const year = target.matches("[data-chart-year]")
    }
  });                                                                                                                                 
}
