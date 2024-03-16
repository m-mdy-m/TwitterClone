import { Icon } from "./Icon.js";
const styleIcon ='w-5 h-5'
export function ActionButtons({ likeCount = null, retweetCount = null }) {
   console.log('likeCount=>',likeCount);
   console.log('retweetCount=>',retweetCount);
  return `
      <div class="flex w-full justify-start items-center pt-3 px-2 text-white [&>*]:cursor-pointer">
         ${Icon({src:'nav/chat-comment.svg',alt: 'Comment',className:'flex items-center',styleIcon , id: 'commentIcon',})}
         ${Icon({src:'nav/heart-null.svg',alt: 'Like',className:'flex items-center',styleIcon , id: 'likeIcon',display:'block',count:likeCount })}
         ${Icon({src:'nav/ReTweet.svg',alt: 'ReTweet',className:'flex items-center',styleIcon , id: 'retweetIcon',display:'block',count:retweetCount })}
         ${Icon({src:'nav/share.svg',alt: 'share',className:'flex items-center ',styleIcon, id: 'shareIcon',})}
      </div>
    `;
}
