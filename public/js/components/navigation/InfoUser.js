import { UserInfo } from "./gen/info.js";

export function InfoUser({postValue,postUnit,followersValue,followersUnit,followingValue,followingUnit }) {
  const userStats = [
    { id: "posts", value: postValue, unit: postUnit, label: "Posts" },
    { id: "followers", value: followersValue, unit: followersUnit, label: "Posts" },
    { id: "following", value:followingValue, unit: followingUnit , label: "Posts" },
  ];
  return `<!-- info user -->
    <div id="userInfo" class="flex items-center justify-center mobile:mt-1 mobile:gap-0 smallTb:mt-2 smallTb:gap-2 border-b-4 border-[#2f2f30]">
        ${UserInfo(userStats)}
    </div>`;
}
