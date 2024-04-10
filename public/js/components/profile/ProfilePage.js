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
    <div class="w-full h-full grid grid-cols-profile relative">
        <div class="absolute bg-[#11101076] border-2 backdrop-filter backdrop-blur-md wrapper__change-password hidden opacity-0 border-gray-600  top-1/2 h-5/6 w-2/5  rounded-md z-50 -translate-x-1/2 -translate-y-1/2 transform left-1/2 ">
          <div class="flex justify-evenly w-full h-full flex-col relative">
              <div class="absolute cursor-pointer top-1 -right-1 w-8 h-8 button__cancel-form z-50"> 
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path fill-rule="evenodd" clip-rule="evenodd" d="M22 12C22 17.5228 17.5228 22 12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12ZM15.3588 15.3587C15.0659 15.6516 14.591 15.6516 14.2981 15.3587L12 13.0606L9.7019 15.3587C9.40901 15.6516 8.93413 15.6516 8.64124 15.3587C8.34835 15.0658 8.34835 14.5909 8.64124 14.298L10.9393 11.9999L8.64125 9.70184C8.34836 9.40895 8.34836 8.93408 8.64125 8.64118C8.93415 8.34829 9.40902 8.34829 9.70191 8.64118L12 10.9393L14.2981 8.64119C14.591 8.3483 15.0659 8.3483 15.3588 8.64119C15.6516 8.93409 15.6516 9.40896 15.3588 9.70185L13.0607 11.9999L15.3588 14.298C15.6517 14.5909 15.6517 15.0658 15.3588 15.3587Z" fill="#2a848e"/>
                </svg>
              </div>
              <div class="flex justify-center w-full password_old">
                <input type="text" placeholder="write current password"  class="placeholder:capitalize p-2 rounded-md h-full py-4 w-2/3 border border-slate-500  outline-none bg-[#13171ec6] text-white">
              </div>
              <form action="" class="justify-center opacity-0 password_new-form [&>*]:cursor-default flex w-full [&>*]:my-4 flex-col items-center form__password-changes" method="POST">
                <input type="password" placeholder="new Password" class="password_new-input  h-full py-4 w-2/3 border-none outline-none bg-gray-700 text-white p-2 rounded-md " />
                <input type="password" placeholder="Confirm Password" class="password_new-input-conf h-full py-4 w-2/3 border-none outline-none bg-gray-700 text-white p-2 rounded-md" />
                <button type="submit"  class=" z-50 capitalize p-3 rounded-md w-1/2 bg-blue-300"> save password </button>
              </form>
          </div>
        </div>
        <div data-page="profile-user" class="rounded-md grid grid-rows-profile transition-all duration-300 ">
          <div class="relative  rounded-t-lg flex justify-center" style="background:${randomGradientColor()}">
                <div data-page="img-profile-user" class="bg-yellow-500 transition-all duration-1000 absolute rounded-full p-2 border-4 border-[#434346] w-28 h-28 left-8 -bottom-8 flex justify-center items-center">
                   <img src="/assets/icon/nav/user.svg" alt="" class="profile-img-user rounded-full border-4 w-full h-full  object-cover">
                   <form action="" id="upload_img" method="POST" enctype="multipart/form-data">
                      <label for="profile-image" class="absolute hidden btn__upload-img show-edit bottom-0 z-50 label__input-img right-0 cursor-pointer hover:contrast-150 hover:rotate-45 transition-all delay-200" id="add-profile">
                          <svg class="object-cover" width="26" height="26" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path fill-rule="evenodd" clip-rule="evenodd" d="M22 12C22 17.5228 17.5228 22 12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12ZM7.25 12C7.25 11.5858 7.58579 11.25 8 11.25H11.25V8C11.25 7.58579 11.5858 7.25 12 7.25C12.4142 7.25 12.75 7.58579 12.75 8V11.25H16C16.4142 11.25 16.75 11.5858 16.75 12C16.75 12.4142 16.4142 12.75 16 12.75H12.75V16C12.75 16.4142 12.4142 16.75 12 16.75C11.5858 16.75 11.25 16.4142 11.25 16V12.75H8C7.58579 12.75 7.25 12.4142 7.25 12Z" fill="#007bff"/>
                          </svg>
                      </label>
                      <input type="file" id="profile-image" name="profilePic" accept="image/*" class="hidden">
                   </form>
                </div>                                                                                                                                     
          </div>
          <div class="pt-12 px-4 relative" id="userProfileContainer">
              <div class="top-2 right-0 absolute z-5 transition-all delay-2000 z-50 show-edit btn- hidden">
                   <button class=" w-10 btn-change-password flex items-center hover:brightness-110 text-xs h-10 px-2 rounded-l-2xl border border-gray-600 focus:border-gray-400 bg-gradient-to-br from-blue-600 to-blue-700 text-white font-Aktiv__regular outline-none relative overflow-hidden">
                       <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                           <path fill-rule="evenodd" clip-rule="evenodd" d="M2.75 12C2.75 6.89137 6.89137 2.75 12 2.75C16.75 2.75 20.6637 6.33026 21.1899 10.9394L19.2372 10.2885C18.8442 10.1575 18.4195 10.3699 18.2885 10.7628C18.1575 11.1558 18.3699 11.5805 18.7628 11.7115L21.7628 12.7115C21.9915 12.7877 22.243 12.7494 22.4385 12.6084C22.6341 12.4675 22.75 12.2411 22.75 12C22.75 6.06294 17.9371 1.25 12 1.25C6.06294 1.25 1.25 6.06294 1.25 12C1.25 17.9371 6.06294 22.75 12 22.75C16.2219 22.75 19.874 20.3161 21.6322 16.7782C21.8165 16.4073 21.6652 15.9571 21.2943 15.7728C20.9234 15.5885 20.4732 15.7397 20.2889 16.1107C18.7744 19.1582 15.6308 21.25 12 21.25C6.89137 21.25 2.75 17.1086 2.75 12ZM12 7.75C11.3096 7.75 10.75 8.30964 10.75 9V10H13.25V9C13.25 8.30964 12.6904 7.75 12 7.75ZM9.25 10C9.25 10.0479 9.25449 10.0947 9.26307 10.1401C8.5232 10.4335 8 11.1557 8 12V14C8 15.1046 8.89543 16 10 16H14C15.1046 16 16 15.1046 16 14V12C16 11.1557 15.4768 10.4335 14.7369 10.1401C14.7455 10.0947 14.75 10.0479 14.75 10V9C14.75 7.48122 13.5188 6.25 12 6.25C10.4812 6.25 9.25 7.48122 9.25 9V10Z" fill="#FFFFFF"/>
                       </svg>
                       <span class="ml-2 opacity-0 right-2 transition-all ease-in-out duration-300 absolute">Change Password</span>
                   </button>
              </div>
              <div class="absolute bottom-4 right-4  items-center justify-center show-edit change-save hidden">
                 <button class="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 transition duration-300 ease-in-out">Save Changes</button>
              </div>
              <div class="absolute top-1 right-2 w-3/5 h-2/4  justify-start px-8 items-center hidden show-edit">
                <div class="flex flex-col justify-evenly h-full items-center">
                  <input data-input-email type="email" placeholder="Enter your new email address" class="w-64 placeholder:text-sm h-12 px-5 rounded-2xl border-2 border-gray-600 focus:border-gray-400 bg-gradient-to-br from-gray-800 to-gray-900 placeholder-gray-400 text-white text-base font-Aktiv__regular outline-none" />
                </div>
              </div>
              <div class="flex justify-start items-start flex-col">
                <!-- User Name -->
                <h2 data-username class="text-gray-700 hidden-edit pl-2  font-Aktiv__regular cursor-default">@m__mdy__m</h2>
                <input data-input-username  type="text" value="" class="hidden show-edit bg-transparent text-gray-700 font-Aktiv__regular w-auto border-none outline-none rounded-md pl-2  "/>
                <!-- Bio -->
                <p data-bio  class=" text-gray-400 hidden-edit mobile:text-sm smallTb:text-base overflow-hidden whitespace-nowrap overflow-ellipsis">Greatness، of small steps!</p>
                <input data-input-bio type="text" value="" class="hidden show-edit  bg-transparent w-auto border-none whitespace-nowrap outline-none rounded-md text-gray-400"/>
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
