import { Profile } from "../common/Profile.js";

export function UserProfile({ username, profile, className,retweetedUsername,isRetweeted='hidden' }) {
  console.log('retweetedUsername=>',retweetedUsername);
  return `
  <div class="container__profile-users flex ">
      <div class="justify-center items-center absolute top-2 left-[4px] ${isRetweeted} user-retweeted">
          <a href="#" class="hover:underline text-[#fff] text-[8px] ${isRetweeted} items-center">@${retweetedUsername}</a>
      </div>
      <div class="bg-gradient-to-tr from-[#222224] to-[#262629] rounded-full profile-user flex justify-center items-center border border-[#403e42] shadow-lg cursor-pointer duration-100 transition-all hover:scale-105">
        <img src="/assets/icon/nav/retweeted.svg" alt="" class="w-8 h-8 absolute hover:-z-10 icon-retweet ${isRetweeted}">
        ${Profile({ profile, username, className })}
      </div>
  </div>
  `;
}
