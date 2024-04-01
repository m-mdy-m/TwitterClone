import { UserProfile } from "./UserProfile.js";

export function UserInfo({ username, profile, createdAt,isRetweeted,retweetedUsername }) {
  return `
      <div class="flex justify-start items-center">
         ${UserProfile({username:username,profile:profile,className : "w-8 h-8",isRetweeted,retweetedUsername})} 
          <div class="flex justify-center flex-col items-center h-full px-2">
              <div class="flex justify-start w-full items-center relative">
                <h2 class="username font-Aktiv__regular text-xs text-white">${username}</h2>
              </div>
              <div class="flex justify-center items-center text-gray-500">
                  <p class="flex items-center space-x-1 font-mavis__bold text-sm tweet-time">${createdAt}</p>
              </div>
          </div>
      </div>
    `;
}
