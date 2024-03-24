import { Profile } from "../common/Profile.js";

export function UserProfile({ username, profile, className }) {
  return `
  <img src="/assets/icon/nav/ReTweet.svg" alt="" class="w-8 h-8 absolute hover:-z-10">
  <div class="bg-gradient-to-tr from-[#222224] to-[#262629] relative rounded-full flex justify-center items-center border border-[#403e42] shadow-lg cursor-pointer duration-100 transition-all hover:scale-105">
    <p class="text-[#1da1f2] text-xs font-semibold absolute -right-16 top-0">
      <a href="#" class="hover:underline">@m__mdy__m</a>
    </p>
      ${Profile({ profile, username, className })}
  </div>`;
}
