import { Profile } from "../common/Profile.js";

export function UserProfile({ username, profile, className }) {
  return `
  <img src="/assets/icon/nav/retweeted.svg" alt="" class="w-8 h-8 absolute hover:-z-10">
  <div class="flex justify-center items-center absolute top-0 left-4">
      <p class="text-[#144d6a] text-xs flex items-center">
        <a href="#" class="hover:underline pr-2">${username}</a>
      </p>
    </div>
  <div class="bg-gradient-to-tr from-[#222224] to-[#262629] rounded-full profile-users flex justify-center items-center border border-[#403e42] shadow-lg cursor-pointer duration-100 transition-all hover:scale-105">
      ${Profile({ profile, username, className })}
  </div>`;
}
