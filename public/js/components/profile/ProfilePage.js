import { statusUser } from "../navigation/gen/info.js";
import { navUserIcon } from "./nav/nav_profile.js";

export function ProfilePage() {
  const userStats = [
    { id: "posts", value: 0, unit: "", label: "Posts" },
    { id: "followers", value: 0, unit: "", label: "Posts" },
    { id: "following", value:0, unit: "" , label: "Posts" },
  ];
  return `
    <div class="w-full h-full grid grid-cols-profile ">
        <div class="bg-green-700 rounded-md grid grid-rows-profile">
              <div class="bg-red-700 relative">

              <div class="bg-yellow-500 absolute rounded-full w-40 h-40 left-8 -bottom-16">
              </div>
              </div>
              <div class="bg-blue-700 pt-16 px-8">
                    <p class="text-gray-700 font-Aktiv__regular cursor-default">@m__mdy__m</p>
                    <p class="text-white text-lg">'Greatness، of small steps'!</p>
                    <div class="flex items-center justify-start mobile:mt-1 mobile:gap-0 smallTb:mt-2 smallTb:gap-2 border-b-4 border-[#2f2f30]">
                      ${statusUser(userStats)}
                    </div>
                    <div>
                        <div> Posts </div>
                        <div> Likes </div>
                        <div> Retweets </div>
                    </div>
              </div>
        </div>
        ${navUserIcon()}
    </div>
  `;
}
