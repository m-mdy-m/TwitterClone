import { UserInfo } from "./gen/info.js";

export function InfoUser({postValue=0,postUnit='',followersValue=0,followersUnit='',followingValue=0,followingUnit='' }={}) {
  const userStats = [
    { id: "posts", value: postValue=0, unit: postUnit="", label: "Posts" },
    { id: "followers", value: followersValue=0, unit: followersUnit="", label: "Posts" },
    { id: "following", value:followingValue=0, unit: followingUnit="" , label: "Posts" },
  ];
  return `<!-- info user -->
    <div id="userInfo" class="flex items-center justify-center mobile:mt-1 mobile:gap-0 smallTb:mt-2 smallTb:gap-2 border-b-4 border-[#2f2f30]">
        ${UserInfo(userStats)}
    </div>`;
}
