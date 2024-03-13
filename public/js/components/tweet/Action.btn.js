import { Icon } from "./Icon.js";

export function ActionButtons() {
  return `
      <div class="flex w-full justify-start items-center pt-3 px-2 text-white [&>*]:cursor-pointer">
         ${Icon({src:'nav/chat-comment.svg',alt: 'Chat',className:'flex items-center '})}
         ${Icon({src:'nav/heart-null.svg',alt: 'Like',className:'flex items-center '})}
         ${Icon({src:'nav/ReTweet.svg',alt: 'ReTweet',className:'flex items-center '})}
         ${Icon({src:'nav/share.svg',alt: 'share',className:'flex items-center '})}
      </div>
    `;
}
