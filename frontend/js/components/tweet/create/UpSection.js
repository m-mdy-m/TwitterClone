import { UserProfile } from "../UserProfile";

export function UpSection({username,profile}){
    return `<!-- User Profile -->
    <div class="flex flex-col justify-start items-center">
      ${UserProfile({username:username,profile:profile,width:12,height:12})}
    </div>
    <!-- Tweet section -->
    <div class="flex justify-center items-center relative">
      <textarea id="tweetInput" placeholder="What's happening?" class="pr-7 h-auto min-h-32 w-full bg-[#161617] px-1 py-2 border border-[#343435] text-gray-300 rounded-lg focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 resize-none overflow-hidden"></textarea>
      <!-- Absolute SVG icon -->
      <div id="icon-tweet" class="absolute right-2 top-5 transform -translate-y-1/2 opacity-100 transition-opacity duration-300">
        <svg width="24" height="24" class="h-6 w-6 cursor-pointer animate-opacity" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path fill-rule="evenodd" clip-rule="evenodd" d="M21.9813 4.0651C22.151 2.85824 21.141 1.849 19.9342 2.0187C13.0461 2.98731 7.59633 8.43705 6.62773 15.3252C6.5831 15.6426 6.62001 15.9464 6.72061 16.2186C6.72061 16.2186 6.72061 16.2187 6.72062 16.2187L1.46967 21.4696C1.17678 21.7625 1.17678 22.2374 1.46967 22.5303C1.76256 22.8231 2.23744 22.8231 2.53033 22.5303L7.78115 17.2794C8.05326 17.38 8.35686 17.4169 8.67411 17.3723C11.2473 17.0106 13.6198 16.0235 15.6329 14.5697C16.0381 14.2771 16.262 13.8 16.262 13.3002C16.262 12.3905 16.9995 11.653 17.9092 11.653C18.409 11.653 18.8861 11.4291 19.1787 11.0239C20.6325 9.01079 21.6196 6.6383 21.9813 4.0651ZM6.72062 16.2187C6.902 16.7095 7.29037 17.098 7.78115 17.2794V17.2794L12.5976 12.4629C12.8905 12.1701 12.8905 11.6952 12.5976 11.4023C12.3047 11.1094 11.8299 11.1094 11.537 11.4023L6.72062 16.2187Z" fill="#4D85F1"/>
        </svg>
      </div>
      <p id="charCount" class="absolute bottom-1 text-xs right-0 mr-2 text-gray-500">0/380</p>
    </div>`
}