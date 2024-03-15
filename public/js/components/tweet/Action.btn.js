import { Icon } from "./Icon.js";

export function ActionButtons() {
  return `
      <div class="flex w-full justify-start items-center pt-3 px-2 text-white [&>*]:cursor-pointer">
         ${Icon({src:'nav/chat-comment.svg',alt: 'Comment',className:'flex items-center' , id: 'commentIcon',styles:'w-6 h-6'})}
         ${Icon({src:'nav/heart-null.svg',alt: 'Like',className:'flex items-center' , id: 'likeIcon',styles:'w-6 h-6',display:'block'})}
         ${Icon({src:'nav/ReTweet.svg',alt: 'ReTweet',className:'flex items-center' , id: 'retweetIcon',styles:'w-6 h-6',display:'block'})}
         ${Icon({src:'nav/share.svg',alt: 'share',className:'flex items-center ', id: 'shareIcon',styles:'w-6 h-6'})}
      </div>
    `;
}
