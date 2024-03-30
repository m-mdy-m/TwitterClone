import { Icon } from "./Icon.js";
const styleIcon ='w-5 h-5'
export function ActionButtons({retweetCount,likeCount,srcLikeIcon,srcRetweetIcon}) {
  return `
      <div class="flex w-full justify-between items-center pt-3 overflow-hidden px-2 text-white relative [&>*]:cursor-pointer border-t border-[#252424] ">
         <div class="flex justify-center items-center">
          ${Icon({src:'nav/chat-comment.svg',alt: 'Comment',className:'flex items-center',styleIcon , id: 'commentIcon',})}
          ${Icon({src:srcLikeIcon,alt: 'Like',className:'flex items-center',styleIcon , id: 'likeIcon',display:'block',count:likeCount })}
          ${Icon({src:srcRetweetIcon,alt: 'ReTweet',className:'flex items-center',styleIcon , id: 'retweetIcon',display:'block',count:retweetCount })}
          ${Icon({src:'nav/share.svg',alt: 'share',className:'flex items-center ',styleIcon, id: 'shareIcon',})}
         </div>
         <div id="iconSubmitEdit" class="text-white absolute -right-28 show-button-edit z-40 top-1">
           <button class="bg-[#28252576] hover:contrast-125  text-gray-400 font-mavis__light px-2 py-px rounded-xl transition duration-300 ease-in-out transform">
               <span class="z-10">Save Changes</span>
           </button>
         </div>
      </div>
    `;
}
