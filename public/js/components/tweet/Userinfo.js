import { UserProfile } from "./UserProfile.js";

export function UserInfo({
  username,
  profile,
  createdAt,
  isRetweeted,
  retweetedUsername,
  followStatus="hidden",
  content_follow_user='follow'
}) {
  return `
      <div class="flex justify-start items-center">
         ${UserProfile({
           username: username,
           profile: profile,
           className: "w-8 h-8",
           isRetweeted,
           retweetedUsername,
         })} 
          <div class="flex justify-center flex-col items-center h-full px-2">
              <div class="flex justify-start w-full items-center relative">
                <h2 class="username font-Aktiv__regular text-xs text-white">${username}</h2>
              </div>
              <div class="flex justify-center items-center text-gray-500">
                  <p class="flex items-center space-x-1 font-mavis__bold text-sm tweet-time">${createdAt}</p>
              </div>
          </div>
          <div class="text-white  ${followStatus}">
           <button class="follow-status capitalize bg-gradient-to-r from-gray-800 to-gray-900 hover:contrast-125  text-gray-400 font-Aktiv__light px-2 py-px rounded-md transition duration-300 ease-in-out transform">
                 ${content_follow_user}
           </button>
         </div>
      </div>
    `;
}
