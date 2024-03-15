import { UserInfo } from "./tweet/Userinfo.js";
import { PostContent } from "./tweet/PostContent.js";
import { ActionButtons } from "./tweet/Action.btn.js";

function Tweet({
  username,
  content,
  profile = "/assets/images/profilePic.png",
  createdAt,
  id,
}) {
  return `
    <div class="w-full min-h-28 h-auto my-4 rounded-2xl grid grid-rows-readTweet bg-[#111010] px-4 pt-6" data-id="${id}">
      <div class="flex justify-between items-center">
        ${UserInfo({ username, profile, createdAt })}
        <div class="flex justify-center items-center w-8 h-8 transition-transform cursor-pointer transform hover:scale-110">
          <svg class="hover:animate-pulse" width="80" height="80" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path fill-rule="evenodd" clip-rule="evenodd" d="M5.5 12.25C5.5 12.9404 6.05964 13.5 6.75 13.5C7.44036 13.5 8 12.9404 8 12.25C8 11.5596 7.44036 11 6.75 11C6.05964 11 5.5 11.5596 5.5 12.25ZM11.75 13.5C11.0596 13.5 10.5 12.9404 10.5 12.25C10.5 11.5596 11.0596 11 11.75 11C12.4404 11 13 11.5596 13 12.25C13 12.9404 12.4404 13.5 11.75 13.5ZM16.75 13.5C16.0596 13.5 15.5 12.9404 15.5 12.25C15.5 11.5596 16.0596 11 16.75 11C17.4404 11 18 11.5596 18 12.25C18 12.9404 17.4404 13.5 16.75 13.5Z" fill="#e3e3e3"/>
          </svg>
        </div>
      </div>
      <div class="min-h-auto w-full flex justify-between items-center flex-col pb-3 pr-2">
        ${PostContent({ content })}
        ${ActionButtons()}
      </div>
    </div>
  `;
}

export default Tweet;
