import { fetchLike } from "../common/fetchTweet.js";
import { getId } from "../common/handlers.js";
export async function handleClick(event) {
  const elm = event.target;
  const id = getId(elm);
  const count = await fetchLike(id);
  
  const pTag = elm.nextElementSibling;
  pTag.innerHTML = count;
  if (count > 0) {
    elm.src = '/assets/icon/nav/heart-full.svg'
  }else{
    elm.src = '/assets/icon/nav/heart-null.svg'
  }
}
