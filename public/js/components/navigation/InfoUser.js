import {  statusUser } from "./gen/info.js";

export function InfoUser() {
  const userStats = [
    { id: "posts", value: 0, unit: "", label: "Posts" },
    { id: "followers", value: 0, unit: "", label: "Followers" },
    { id: "following", value:0, unit: "" , label: "Following" },
  ];
  return `<!-- info user -->
    <div id="statusUser" class="flex items-center justify-center mobile:mt-1 mobile:gap-0 smallTb:mt-2 smallTb:gap-2 border-b-4 border-[#2f2f30]">
        ${statusUser(userStats)}
    </div>`;
}
