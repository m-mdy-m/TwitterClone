import { fetchLike } from "../common/fetchTweet.js";
import { getId } from "../common/handlers.js"

// Handles the click event on icons.
export function handleClick(event) {
  const el = event.target;
  const id = getId(el);
  fetchLike(id)
}
