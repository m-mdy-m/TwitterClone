import { getUserInfo, toggleLike } from "../utils/apiOperations.js";
import { getId } from "../utils/helper.js";

export async function handleClick(event) {
  const elm = event.target;
  try {
    const id = getId(elm);
    const count = await toggleLike(id);
    const user = await getUserInfo();
    const isLikedUser = user.likes.some((like) => like === id);
    // Construct the updated HTML content based on the like count and user's like status
    let htmlContent = '';
    if(isLikedUser){
      htmlContent = count
      elm.src = "/assets/icon/nav/heart-full.svg"
    }else{
      if (count > 0) {
        htmlContent = count;
        elm.src = "/assets/icon/nav/heart-null.svg";
      } else {
        htmlContent = null;
      }
    }
    // Get the sibling paragraph tag for count display
    const pTag = elm.nextElementSibling;
    // Update the HTML content of the sibling paragraph tag
    pTag.innerHTML = htmlContent;
    // Add animation if the count is greater than 0 (first time like)
    if (count === 1) {
      elm.classList.add("heart-icon");
    } else {
      elm.classList.remove("heart-icon");
    }
  } catch (error) {
    // Handle fetch error
    console.error("Error fetching like count:", error);
    // Revert back to the default heart icon
    elm.src = "/assets/icon/nav/heart-null.svg";
  }
}
