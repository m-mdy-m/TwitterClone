import { UserProfile } from "./UserProfile.js";

export function UserInfo({ username, profile, currentTimeFormatted }) {
  return `
      <div class="flex justify-start items-center">
         ${UserProfile({username:username,profile:profile,width:8,height:8})}  
          <div class="flex justify-center flex-col items-center h-full px-2">
              <div class="flex justify-start w-full items-center">
                  <h2 class="username font-Aktiv__regular text-xs text-white">${username}</h2>
              </div>
              <div class="flex justify-center items-center text-gray-500">
                  <p class="flex items-center space-x-1 font-mavis__bold text-sm">${currentTimeFormatted}</p>
              </div>
          </div>
      </div>
    `;
}
