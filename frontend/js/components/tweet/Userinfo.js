export function UserInfo({ username, profile, currentTimeFormatted }) {
  return `
      <div class="flex justify-start items-center">
          <div class="bg-gradient-to-tr from-[#222224] to-[#262629] rounded-full flex justify-center items-center border border-[#403e42] shadow-lg cursor-pointer duration-100 transition-all hover:scale-105">
              <img src="${profile}" alt="${username}" class="profilePic w-8 h-8">
          </div>
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
  