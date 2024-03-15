import { Icon } from "./Icon.js";
const styleIcon ='w-4 h-4'
export function ActionButtons(countLike,countReTweet) {
  return `
      <div class="flex w-full justify-start items-center pt-3 px-2 text-white [&>*]:cursor-pointer">
         ${Icon({src:'nav/chat-comment.svg',alt: 'Comment',className:'flex items-center',styleIcon , id: 'commentIcon',})}
         ${Icon({src:'nav/heart-null.svg',alt: 'Like',className:'flex items-center',styleIcon , id: 'likeIcon',display:'block',count:countLike})}
         ${Icon({src:'nav/ReTweet.svg',alt: 'ReTweet',className:'flex items-center',styleIcon , id: 'retweetIcon',display:'block',count:countReTweet})}
         ${Icon({src:'nav/share.svg',alt: 'share',className:'flex items-center ',styleIcon, id: 'shareIcon',})}
      </div>
    `;
}
