import { Icon } from "../tweet/Icon.js";
import { PostContent } from "../tweet/PostContent.js";

export function TweetsProfile({id,createdAt,isBookmarked,content,showDeleteIcon}){
    return `
    <div data-id="${id}" class="max-w-full min-h-44 min-w-52 h-auto my-4 mx-4 rounded-lg relative flex flex-col border-2 bg-[#11101076] border-t border-[#111010] p-2">
        <!-- Bookmarked Tweet  -->
        <svg class="bookmarked w-4 h-4 top-2 left-1 ${isBookmarked} absolute text-blue-400 transition-colors duration-300 ease-in-out" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
           <path fill-rule="evenodd" clip-rule="evenodd" d="M4 7.75V18C4 19.6481 5.88153 20.5889 7.2 19.6L10.8 16.9C11.5111 16.3667 12.4889 16.3667 13.2 16.9L16.8 19.6C18.1185 20.5889 20 19.6481 20 18V7.75H4ZM4 6.25H20V4C20 2.89543 19.1046 2 18 2H6C4.89543 2 4 2.89543 4 4V6.25Z" fill="currentColor"/>
        </svg>
        <div class="flex absolute bottom-2 left-1/3  justify-center items-center text-gray-500">
            <p class="flex items-center space-x-1 font-mavis__bold text-sm">${createdAt}</p>
        </div>
        <div id="iconSubmitEdit" class="text-white absolute z-50 opacity-0 right-0 bottom-8">
           <button class="bg-[#28252576] hover:contrast-125  text-gray-400 font-mavis__light px-2 rounded-l-md transition duration-300 ease-in-out transform">
               <span class="z-10">Save Changes</span>
           </button>
        </div>
        <div class="flex justify-end items-center min-w-20 list__menu-icon-profile h-auto [&>*]:cursor-pointer relative">
            <!-- Delete tweet icon -->
            <svg class="deleteIcon ${showDeleteIcon} w-6 h-6 text-gray-400 hover:text-red-500 transition-colors duration-300 ease-in-out" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
               <path fill-rule="evenodd" clip-rule="evenodd" d="M9.40627 2.8906C9.7772 2.3342 10.4017 2 11.0704 2H12.9296C13.5983 2 14.2228 2.3342 14.5937 2.8906L15.5 4.25H19.25C19.6642 4.25 20 4.58579 20 5C20 5.41421 19.6642 5.75 19.25 5.75H4.75C4.33579 5.75 4 5.41421 4 5C4 4.58579 4.33579 4.25 4.75 4.25H8.5L9.40627 2.8906ZM15 22H9C6.79086 22 5 20.2091 5 18V7H19V18C19 20.2091 17.2091 22 15 22ZM10 10.25C10.4142 10.25 10.75 10.5858 10.75 11V18C10.75 18.4142 10.4142 18.75 10 18.75C9.58579 18.75 9.25 18.4142 9.25 18L9.25 11C9.25 10.5858 9.58579 10.25 10 10.25ZM14 10.25C14.4142 10.25 14.75 10.5858 14.75 11V18C14.75 18.4142 14.4142 18.75 14 18.75C13.5858 18.75 13.25 18.4142 13.25 18V11C13.25 10.5858 13.5858 10.25 14 10.25Z" fill="currentColor"/>
            </svg>
            <!-- Bookmark Icon -->
            <svg class="bookmarkIcon w-6 h-6 text-gray-400 hover:text-blue-400 transition-colors duration-300 ease-in-out" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path fill-rule="evenodd" clip-rule="evenodd" d="M4 7.75V18C4 19.6481 5.88153 20.5889 7.2 19.6L10.8 16.9C11.5111 16.3667 12.4889 16.3667 13.2 16.9L16.8 19.6C18.1185 20.5889 20 19.6481 20 18V7.75H4ZM4 6.25H20V4C20 2.89543 19.1046 2 18 2H6C4.89543 2 4 2.89543 4 4V6.25Z" fill="currentColor"/>
            </svg>
            <!-- Edit Icon -->
            <svg class="editIcon w-6 h-6 fill-current text-gray-400 hover:text-blue-500 transition duration-300 ease-in-out transform cursor-pointer" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path fill-rule="evenodd" clip-rule="evenodd" d="M19.0711 4.59512C17.9827 3.50676 16.2181 3.50676 15.1298 4.59512L14.0201 5.70482L17.9751 9.65979L19.0848 8.55008C20.1732 7.46172 20.1732 5.69717 19.0711 4.59512ZM16.6062 11.0022L13.6521 7.04815L4.66795 16.0344C4.10741 16.5949 3.72903 17.311 3.58079 18.0898L3.15657 20.3182C3.02461 21.0114 3.63276 21.6196 4.32595 21.4877L6.55442 21.0635C7.33316 20.9152 8.04933 20.5362 8.60987 19.9757L16.6062 11.0022Z" fill="currentColor"/>
            </svg>
        </div>
      <div class="min-h-44 max-h-44 max-w-52 flex justify-between items-start flex-col pb-3 pr-2 relative">
        ${PostContent({ profile_mode:true, content })}
        <div class="wrapper_buttons flex w-full justify-end items-center pt-3 px-2 text-white relative [&>*]:cursor-pointer border-t border-[#252424] ">
        ${Icon({src:'profile_nav/chart-tweet.svg',alt: 'Chart',styleIcon:'w-6 h-6' , id: 'chart__tweet-icon',className:"!absolute left-0 hover:text-white transition-all"})}
        </div>
      </div>
    </div>
  `;
}