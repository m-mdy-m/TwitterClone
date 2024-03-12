



function template(username,content,profile = "/assets/images/profilePic.png") {
  return `<div class="w-full min-h-32 h-auto mt-4 rounded-2xl grid grid-rows-readTweet bg-[#111010] px-4 py-2">
  <!-- up section tweet -->
<div class="flex justify-between items-center">
    <!-- Wrapper info user -->
    <div class="flex justify-start items-center">
        <!-- User Profile -->
        <div class="bg-gradient-to-tr from-[#222224] to-[#262629] rounded-full flex justify-center items-center border border-[#403e42] shadow-lg  cursor-pointer duration-100 transition-all hover:scale-105 ">
            <img src=${profile} alt="${username}" class="profilePic w-8 h-8">
        </div>
        <div class="flex justify-center flex-col items-center h-full px-2">
            <!-- User name -->
            <div class="flex justify-center flex-col items-center">
                <h2 class="username font-Aktiv__regular text-xs  text-white">${username}</h2>
            </div>
            <!-- Time Published -->
            <div class="flex justify-center items-center text-gray-500">
                <p class="flex items-center space-x-1 font-mavis__bold text-sm">
                    <em class="text-[#9e9ca1]">15</em>
                    <span class="text-[#9e9ca1]">Aug</span>
                    <span>•</span>
                    <span class="text-[#9e9ca1]">4:21</span>
                    <span class="text-[#9e9ca1] uppercase ml-1">PM</span>
                </p>
            </div>
        </div>
    </div>
    <!-- Setting Post -->
    <div class="flex justify-center items-center w-8 h-8 transition-transform cursor-pointer transform hover:scale-110">
        <svg class="hover:animate-pulse" width="80" height="80" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path fill-rule="evenodd" clip-rule="evenodd" d="M5.5 12.25C5.5 12.9404 6.05964 13.5 6.75 13.5C7.44036 13.5 8 12.9404 8 12.25C8 11.5596 7.44036 11 6.75 11C6.05964 11 5.5 11.5596 5.5 12.25ZM11.75 13.5C11.0596 13.5 10.5 12.9404 10.5 12.25C10.5 11.5596 11.0596 11 11.75 11C12.4404 11 13 11.5596 13 12.25C13 12.9404 12.4404 13.5 11.75 13.5ZM16.75 13.5C16.0596 13.5 15.5 12.9404 15.5 12.25C15.5 11.5596 16.0596 11 16.75 11C17.4404 11 18 11.5596 18 12.25C18 12.9404 17.4404 13.5 16.75 13.5Z" fill="#e3e3e3"/>
        </svg>
    </div>
  </div>
  <!-- Wrapper Content Tweet -->
  <div class="min-h-32 w-full flex justify-between items-center flex-col pb-3 pr-2">
    <!-- Content Tweet -->
      <div class="border-b border-[#252424] pb-2">
          <!-- Text overlay -->
          <div class="flex justify-center items-center text-white text-base font-Aktiv__regular">
              <p>${content}</p>
          </div>
      </div>
    <!-- Info Tweet -->
    <div class="flex w-full justify-start items-center pt-3 pb-5 px-2 text-white  [&>*]:cursor-pointer">
        <!-- Comment -->
        <div class="flex items-center mr-4 icon-container  transform transition duration-150 hover:scale-110">
            <img src="/assets/icon/nav/chat-comment.svg" alt="comment">
        </div>
        <!-- Like -->
        <div class="flex items-center mr-4  icon-container  transform transition duration-150 hover:scale-110">
          <img src="/assets/icon/nav/heart-null.svg" alt="comment">
        </div>
        <!-- Retweet -->
        <div class="flex items-center mr-4  icon-container  transform transition duration-150 hover:scale-110">
          <img src="/assets/icon/nav/ReTweet.svg" alt="comment">
        </div>
        <!-- share -->
        <div class="flex items-center  icon-container  transform transition duration-150 hover:scale-110">
          <img src="/assets/icon/nav/share.svg" alt="comment">
        </div>
    </div>
  </div>
</div>`;
}
export default template;
