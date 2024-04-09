import { randomGradientColor } from "../../utils/utils.js";
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
        <div data-page="profile-user" class="rounded-md grid grid-rows-profile transition-all duration-300 ">
          <div class="relative  rounded-t-lg flex justify-center" style="background:${randomGradientColor()}">
                <div data-page="img-profile-user" class="bg-yellow-500 transition-all duration-1000 absolute rounded-full p-2 border-4 border-[#434346] w-28 h-28 left-8 -bottom-8 flex justify-center items-center">
                   <img src="/assets/icon/nav/user.svg" alt="" class=" rounded-full border-4 w-full h-full  object-cover">
                  <label for="profile-image"  class="absolute bottom-0 z-50 hidden right-0 cursor-pointer hover:contrast-150 hover:rotate-45 transition-all delay-200" id="add-profile">
                      <svg class="object-cover" width="26" height="26" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path fill-rule="evenodd" clip-rule="evenodd" d="M22 12C22 17.5228 17.5228 22 12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12ZM7.25 12C7.25 11.5858 7.58579 11.25 8 11.25H11.25V8C11.25 7.58579 11.5858 7.25 12 7.25C12.4142 7.25 12.75 7.58579 12.75 8V11.25H16C16.4142 11.25 16.75 11.5858 16.75 12C16.75 12.4142 16.4142 12.75 16 12.75H12.75V16C12.75 16.4142 12.4142 16.75 12 16.75C11.5858 16.75 11.25 16.4142 11.25 16V12.75H8C7.58579 12.75 7.25 12.4142 7.25 12Z" fill="#007bff"/>
                      </svg>
                  </label >
                  <input type="file" id="profile-image" accept="image/*" class="hidden">
                </div>
          </div>
          <div class="pt-12 px-4 relative" id="userProfileContainer">
              <div class="absolute top-1 right-2 w-3/5 h-2/4  flex justify-start px-8 items-center">
                <div class="justify-center items-center hidden">
                  <input type="password" value="" class="input-form w-4/6 rounded-lg border-none outline-none  h-full bg-gray-700 text-white" />
                  <input type="password" value="" class="input-form w-4/6 rounded-lg border-none outline-none  h-full bg-gray-700 text-white" />
                </div>
                <div class="flex flex-col justify-evenly h-full items-center">
                  <div class="flex flex-col items-center justify-center space-y-4">
                    <input type="text" placeholder="Enter your current password" class="input-form w-64 placeholder:text-sm h-12 px-5 rounded-2xl border-2 border-gray-600 focus:border-gray-400 bg-gradient-to-br from-gray-800 to-gray-900 placeholder-gray-400 text-white text-base font-Aktiv__regular outline-none" />
                    <p class="text-sm">
                      <a href="#" class="text-white hover:underline">Forgot your password?</a>
                    </p>
                  </div>
                  <input type="email" placeholder="Enter your email address" class="input-form w-64 placeholder:text-sm h-12 px-5 rounded-2xl border-2 border-gray-600 focus:border-gray-400 bg-gradient-to-br from-gray-800 to-gray-900 placeholder-gray-400 text-white text-base font-Aktiv__regular outline-none" />
                </div>
              </div>
              <div class="flex justify-start items-start flex-col">
                <!-- User Name -->
                <h2 data-username class="text-gray-700 pl-2  font-Aktiv__regular cursor-default">@m__mdy__m</h2>
                <input type="text" value="@m__mdy__m" class="bg-transparent text-gray-700 hidden font-Aktiv__regular w-auto border-none outline-none rounded-md pl-2  " />
                <!-- Bio -->
                <p data-bio  class=" text-gray-400 mobile:text-sm smallTb:text-base overflow-hidden whitespace-nowrap overflow-ellipsis">Greatness، of small steps!</p>
                <input type="text" value="Greatness، of small steps!" class="bg-transparent w-auto hidden border-none whitespace-nowrap outline-none rounded-md text-gray-400" />
              </div>
              <div id="statusProfile" class="flex items-center justify-start">
                ${statusUser(userStats)}
              </div>
              <div id="userInteraction" class=" border-b-4 mt-4 border-[#2f2f30] flex justify-start items-center text-white text-lg [&>*]:mx-2">
                  <div class="relative button__wrapper-profile posts activeButton">
                    <button data-action="posts" class="cursor-pointer border-none outline-none bg-transparent uppercase transition-all duration-300 font-mavis__bold ">
                      Posts
                    </button>
                  </div>
                  <div class="relative button__wrapper-profile likes"> 
                    <button data-action="likes" class=" cursor-pointer border-none outline-none bg-transparent uppercase transition-all duration-300 font-mavis__bold ">
                      Likes
                    </button> 
                  </div>
                  <div class="relative button__wrapper-profile retweets"> 
                   <button data-action="retweets" class=" cursor-pointer border-none outline-none bg-transparent uppercase transition-all duration-300 font-mavis__bold ">
                     Retweets
                   </button> 
                  </div>
              </div>
                  <div class="text-white flex h-auto flex-wrap justify-between items-start " id="wrapper__content-profile">
              </div>
          </div>
        </div>
        ${navUserIcon()}
    </div>
  `;
}
