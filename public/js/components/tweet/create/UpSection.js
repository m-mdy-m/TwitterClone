import { UserProfile } from "../UserProfile.js";

export function UpSection({username,profile}){
    return `<!-- User Profile -->
    <div class="flex flex-col justify-start items-center">
      ${UserProfile({username:username,profile:profile,className:'w-12 h-12'})}
    </div>
    <!-- Tweet section -->
    <div class="flex justify-center items-center relative">
      <textarea id="tweetInput" placeholder="What's happening?" class="pr-7 h-auto min-h-12 w-full bg-transparent  rounded-l-xl px-1 py-2 border-r-transparent border-l-transparent border-b border-[#161617] text-gray-300 outline-none transition-all focus:outline-none focus:rounded-xl focus:border-blue-500 focus:ring-1 focus:ring-blue-500 resize-none overflow-y-hidden"></textarea>
      <!-- Absolute SVG icon -->
      <div id="icon-tweet" class="absolute right-2 top-5 transform -translate-y-1/2 opacity-100 transition-opacity duration-300">
        <img src="/assets/icon/twwets/feather.svg" id="icon-tweet-img"  class="h-6 w-6 cursor-pointer animate-opacity">
      </div>
      <p id="charCount" class="absolute bottom-1 text-xs right-0 mr-2 text-gray-500">0/380</p>
    </div>`
}