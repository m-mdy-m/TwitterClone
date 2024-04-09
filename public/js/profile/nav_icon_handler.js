import { page_analyze } from "../components/profile/analyze/page__analyze.js";
import { loadInfo } from "./loadInfo.js";
import { ChartDataManager } from "./analyze/helper__chart.js";
import {
  findLikedTweets,
  findRetweetedTweets,
  findUserTweets,
} from "../utils/apiOperations.js";
import { edit_page } from "./edit_page.js";
let user, tweets, likes, retweets;
if (window.location.pathname.startsWith("/profile")) {
  (async () => {
    user = await loadInfo();
    [tweets, likes, retweets] = await Promise.all([
      findUserTweets(user.userId),
      findLikedTweets(user.userId),
      findRetweetedTweets(user.userId),
    ]);
  })();
}
export function nav_icons_profile() {
  document.querySelectorAll("[data-page]").forEach((data) => {
    const page = data.getAttribute("data-page");
    // Perform actions based on the clicked page
    switch (page) {
      case "analyze":
        // Code to handle click on analyze_page goes here
        data.addEventListener("click", analyze_page);
        break;
      case "edit":
        // Code to handle click on edit_page goes here
        data.addEventListener("click", ()=>{
          edit_page()
        });
        break;
      case "friends":
        // Code to handle click on friends_page goes here
        data.addEventListener("click", analyze_page);
        break;
      case "deleteAccount":
        // Code to handle click on deleteAccount_page goes here
        data.addEventListener("click", analyze_page);
        break;
      default:
        break;
    }
  });
}

export function analyze_page() {
  // Selecting elements for profile and profile image
  const profileWrapper = document.querySelector('[data-page="profile-user"]');
  const img = document.querySelector('[data-page="img-profile-user"]');

  // Styling the profile image
  img.style.cssText =
    "width:4rem;height:4rem;padding:0;border-width:1px;bottom:-1.5rem;cursor: pointer;";

  // Adjusting grid template rows for profile wrapper
  profileWrapper.style.cssText = `grid-template-rows: 10% minmax(90%,1fr);`;

  // Adding click event listener to the profile image
  img.addEventListener("click", () => {
    // Changing styles on click
    img.style.cssText =
      "width:7rem;height:7rem;padding:8px;border-width:4px;bottom:-2rem;cursor: default;";
    profileWrapper.style.cssText = `grid-template-rows:30% minmax(70%,1fr);`;
  });

  // Clearing user profile container after a timeout
  setTimeout(
    (document.querySelector("#userProfileContainer").innerHTML = ""),
    200
  );

  // Generating template for analysis page
  const template = page_analyze();

  // Inserting template into user profile container
  document.querySelector("#userProfileContainer").innerHTML = template;

  // Creating ChartDataManager instance
  const chart = new ChartDataManager();

  // Iterating through tweets
  tweets.forEach((tweet) => {
    let view = [] || 0;
    tweet.viewedBy.forEach((e) => {
      // Calculating views for current day
      const viewDate = new Date(e.timestamp);
      const weekDay = [
        "Sunday",
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
      ];
      const dayOfWeek = viewDate.getDay();
      const day = weekDay[dayOfWeek];
      const currentTime = new Date();
      const isSameWeek = viewDate.getFullYear() === currentTime.getFullYear() && getWeekNumber(viewDate) === getWeekNumber(currentTime);
      if(isSameWeek){
        view.push({[day]:e});
      }
    });
    // Setting data for the chart
    chart.setData = { views: view };
  });

  // Rendering the chart
  chart.Chart();
}
function getWeekNumber(date) {
  const firstDayOfYear = new Date(date.getFullYear(), 0, 1);
  const pastDaysOfYear = (date - firstDayOfYear) / 86400000;
  return Math.ceil((pastDaysOfYear + firstDayOfYear.getDay() + 1) / 7);
}