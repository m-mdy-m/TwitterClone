import { getUserProfile } from "../../profile/navigation.js";
import { getUserInfo } from "../../utils/apiOperations.js";
import { randomGradientColor, randomColor } from "../../utils/utils.js";
import { statusUser } from "../navigation/gen/info.js";
import { navUserIcon } from "./nav/nav_profile.js";

export function ProfilePage() {
  const userStats = [
    { id: "posts", value: 0, unit: "", label: "Posts" },
    { id: "followers", value: 0, unit: "", label: "Posts" },
    { id: "following", value: 0, unit: "", label: "Posts" },
  ];
  return `
    <div class="w-full h-full grid grid-cols-profile ">
        <div class="rounded-md grid grid-rows-profile">
          <div class="relative  rounded-t-lg flex justify-center" style="background:${randomGradientColor()}">
                <div class="bg-yellow-500 absolute rounded-full p-2 border-4 border-[#434346] w-28 h-28 left-8 -bottom-8 flex justify-center items-center">
                   <img src="/assets/icon/nav/user.svg" alt="" class=" rounded-full border-4 w-full h-full  object-cover">
                </div>
          </div>
          <div class="pt-12 px-4" id="userProfileContainer">
                <!-- User Name -->
                <h2 id="userProfile_username" class="text-gray-700 pl-2  font-Aktiv__regular cursor-default">@m__mdy__m</h2>
                <!-- Bio -->
                <p id="userProfile_bio" class=" text-gray-400 mobile:text-sm smallTb:text-base overflow-hidden whitespace-nowrap overflow-ellipsis"></p>
                <div id="statusProfile" class="flex items-center justify-start">
                  ${statusUser(userStats)}
                </div>
                <div class=" border-b-4 mt-4 border-[#2f2f30] flex justify-start items-center text-white text-lg [&>*]:mx-2">
                    <div class="relative button__wrapper-profile">
                      <button class="cursor-pointer border-none outline-none bg-transparent uppercase transition-all duration-300 font-mavis__bold ">
                        Posts
                      </button>
                    </div>
                    <div class="relative button__wrapper-profile"> 
                      <button class=" cursor-pointer border-none outline-none bg-transparent uppercase transition-all duration-300 font-mavis__bold ">
                        Likes
                      </button> 
                    </div>
                    <div class="relative button__wrapper-profile"> 
                     <button class=" cursor-pointer border-none outline-none bg-transparent uppercase transition-all duration-300 font-mavis__bold ">
                       Retweets
                     </button> 
                    </div>
                </div>
          </div>
        </div>
        ${navUserIcon()}
    </div>
  `;
}