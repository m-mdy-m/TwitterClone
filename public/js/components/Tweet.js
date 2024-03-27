import { UserInfo } from "./tweet/Userinfo.js";
import { PostContent } from "./tweet/PostContent.js";
import { ActionButtons } from "./tweet/Action.btn.js";

function Tweet({
  username,
  content,
  profile,
  createdAt,
  id,
  retweetCount,
  likeCount,
  srcLikeIcon,
  srcRetweetIcon,
  retweetedUsername,isRetweeted,
  isBookmarked,
  bookmarkIcon,
  showDeleteIcon,
}) {
  return `
    <div class="w-full min-h-28 h-auto my-4 rounded-lg relative grid grid-rows-readTweet bg-[#111010] px-3 pt-6" data-id="${id}">
      <!-- Bookmarked Tweet  -->
      <svg class="bookmarked w-4 h-4 top-1 left-1 ${isBookmarked} absolute text-blue-400 transition-colors duration-300 ease-in-out" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
         <path fill-rule="evenodd" clip-rule="evenodd" d="M4 7.75V18C4 19.6481 5.88153 20.5889 7.2 19.6L10.8 16.9C11.5111 16.3667 12.4889 16.3667 13.2 16.9L16.8 19.6C18.1185 20.5889 20 19.6481 20 18V7.75H4ZM4 6.25H20V4C20 2.89543 19.1046 2 18 2H6C4.89543 2 4 2.89543 4 4V6.25Z" fill="currentColor"/>
      </svg>
      <div class="flex justify-between items-center">
        ${UserInfo({ username, profile, createdAt ,isRetweeted,retweetedUsername})}
        <div class="flex justify-center items-center  list__menu-icon w-8 h-8 transition-transform cursor-pointer relative transform hover:scale-110">
           <div class="list__menu-tweet cursor-default [&>*]:cursor-pointer flex justify-center bg-gray-800 px-4 absolute right-0 -z-10 p-1 rounded-r-md rounded-l-xl transition-all">
               <!-- Bookmark Icon -->
               <svg class="bookmarkIcon w-6 h-6 ${bookmarkIcon}  transition-colors duration-300 ease-in-out" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                   <path fill-rule="evenodd" clip-rule="evenodd" d="M4 7.75V18C4 19.6481 5.88153 20.5889 7.2 19.6L10.8 16.9C11.5111 16.3667 12.4889 16.3667 13.2 16.9L16.8 19.6C18.1185 20.5889 20 19.6481 20 18V7.75H4ZM4 6.25H20V4C20 2.89543 19.1046 2 18 2H6C4.89543 2 4 2.89543 4 4V6.25Z" fill="currentColor"/>
               </svg>
               <!-- Delete tweet icon -->
               <svg class="deleteIcon ${showDeleteIcon} w-6 h-6 text-gray-400 hover:text-red-500 transition-colors duration-300 ease-in-out" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                   <path fill-rule="evenodd" clip-rule="evenodd" d="M9.40627 2.8906C9.7772 2.3342 10.4017 2 11.0704 2H12.9296C13.5983 2 14.2228 2.3342 14.5937 2.8906L15.5 4.25H19.25C19.6642 4.25 20 4.58579 20 5C20 5.41421 19.6642 5.75 19.25 5.75H4.75C4.33579 5.75 4 5.41421 4 5C4 4.58579 4.33579 4.25 4.75 4.25H8.5L9.40627 2.8906ZM15 22H9C6.79086 22 5 20.2091 5 18V7H19V18C19 20.2091 17.2091 22 15 22ZM10 10.25C10.4142 10.25 10.75 10.5858 10.75 11V18C10.75 18.4142 10.4142 18.75 10 18.75C9.58579 18.75 9.25 18.4142 9.25 18L9.25 11C9.25 10.5858 9.58579 10.25 10 10.25ZM14 10.25C14.4142 10.25 14.75 10.5858 14.75 11V18C14.75 18.4142 14.4142 18.75 14 18.75C13.5858 18.75 13.25 18.4142 13.25 18V11C13.25 10.5858 13.5858 10.25 14 10.25Z" fill="currentColor"/>
               </svg>
           </div>
          <svg class="hover:animate-pulse list__menu-icon-svg"  width="80" height="80" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path fill-rule="evenodd" clip-rule="evenodd" d="M5.5 12.25C5.5 12.9404 6.05964 13.5 6.75 13.5C7.44036 13.5 8 12.9404 8 12.25C8 11.5596 7.44036 11 6.75 11C6.05964 11 5.5 11.5596 5.5 12.25ZM11.75 13.5C11.0596 13.5 10.5 12.9404 10.5 12.25C10.5 11.5596 11.0596 11 11.75 11C12.4404 11 13 11.5596 13 12.25C13 12.9404 12.4404 13.5 11.75 13.5ZM16.75 13.5C16.0596 13.5 15.5 12.9404 15.5 12.25C15.5 11.5596 16.0596 11 16.75 11C17.4404 11 18 11.5596 18 12.25C18 12.9404 17.4404 13.5 16.75 13.5Z" fill="#e3e3e3"/>
          </svg>
        </div>
      </div>
      <div class="min-h-auto w-full flex justify-between items-center flex-col pb-3 pr-2">
        ${PostContent({ content })}
        ${ActionButtons({ likeCount, retweetCount, srcLikeIcon,srcRetweetIcon })}
      </div>
    </div>
  `;
}

export default Tweet;
