import { Icon } from "./Icon.js";
const styleIcon ='w-5 h-5'
export function ActionButtons({retweetCount,likeCount,srcLikeIcon,srcRetweetIcon,edited_tweet}) {
  return `
      <div class="wrapper_buttons flex w-full justify-start items-center pt-3 overflow-clip px-2 text-white relative [&>*]:cursor-pointer border-t border-[#252424] ">
          ${Icon({src:'nav/chat-comment.svg',alt: 'Comment',styleIcon , id: 'commentIcon',})}
          ${Icon({src:srcLikeIcon,alt: 'Like',styleIcon , id: 'likeIcon',display:'block',content:likeCount })}
          ${Icon({src:srcRetweetIcon,alt: 'ReTweet',styleIcon , id: 'retweetIcon',display:'block',content:retweetCount })}
          ${Icon({src:'nav/share.svg',alt: 'share',styleIcon, id: 'shareIcon',})}
         <div id="iconSubmitEdit" class="text-white absolute -right-28 z-40 top-1">
           <button class="bg-[#28252576] hover:contrast-125  text-gray-400 font-mavis__light px-2 py-px rounded-xl transition duration-300 ease-in-out transform">
               <span class="z-10">Save Changes</span>
           </button>
         </div>
         <p class="status__mode-edit text-gray-400 text-xs ${edited_tweet} !cursor-default">edited</p>
      </div>
    `;
}
