import { fetchLike } from "../common/fetchTweet.js";
import { getId } from "../common/handlers.js";
export async function handleClick(event) {
  const elm = event.target;
  try {
    const id = getId(elm);
    const count = await fetchLike(id);

    // Update the like button based on the fetched count
    const pTag = elm.nextElementSibling;
    if (count > 0) {
      pTag.innerHTML = count;
      elm.src = "/assets/icon/nav/heart-full.svg";
    } else {
      pTag.innerHTML = null;
      elm.src = "/assets/icon/nav/heart-null.svg";
    }
  } catch (error) {
    // Handle fetch error
    console.error("Error fetching like count:", error);
    // Revert back to the default heart icon
    elm.src = "/assets/icon/nav/heart-null.svg";
  }
}
