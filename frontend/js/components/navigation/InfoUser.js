import { UserInfo } from "./gen/info.js";

export function InfoUser() {
  const userStats = [
    { id: "posts", value: 300, unit: "", label: "Posts" },
    { id: "followers", value: 182, unit: "K", label: "Posts" },
    { id: "following", value: 1.04, unit: "M", label: "Posts" },
  ];
  return `<!-- info user -->
    <div id="userInfo" class="flex items-center justify-center mobile:mt-1 mobile:gap-0 smallTb:mt-2 smallTb:gap-2 border-b-4 border-[#2f2f30]">
        ${UserInfo(userStats)}
    </div>`;
}
