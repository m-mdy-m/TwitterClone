import { fetchLike } from "../common/fetchTweet.js";
import { getId } from "../common/handlers.js";
import { ActionButtons } from "../components/tweet/Action.btn.js";

// Handles the click event on icons.
export async function handleClick(event) {
  const id = getId(event.target);
  const count = await fetchLike(id);
  ActionButtons({likeCount:count});
}
