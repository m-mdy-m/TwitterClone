export function boxTweet() {
  return `
    <div class="bg-[#1B2430] w-3/6 h-auto z-50 fixed rounded-lg shadow-lg shadow-[#31363F]">
      <div class="flex flex-col justify-center w-full h-auto p-4 rounded-2xl">
          <!-- up section -->
         <div class="h-1/5 w-full flex justify-between items-center">
          <div class="bg-white rounded-lg p-2">
              <p class="text-teal-800 font-bold">Draft</p>
          </div>
          <div class="bg-yellow-400 rounded-full">
              <!-- Improved Remove Icon Box -->
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                 <path fill-rule="evenodd" clip-rule="evenodd" d="M15.7123 16.7729C16.0052 17.0658 16.4801 17.0658 16.7729 16.7729C17.0658 16.48 17.0658 16.0052 16.7729 15.7123L13.0607 12L16.7729 8.2877C17.0658 7.99481 17.0658 7.51993 16.7729 7.22704C16.48 6.93415 16.0052 6.93415 15.7123 7.22704L12 10.9393L8.28766 7.22699C7.99477 6.9341 7.5199 6.9341 7.227 7.22699C6.93411 7.51989 6.93411 7.99476 7.227 8.28765L10.9393 12L7.22699 15.7123C6.9341 16.0052 6.9341 16.4801 7.22699 16.773C7.51989 17.0659 7.99476 17.0659 8.28765 16.773L12 13.0606L15.7123 16.7729Z" fill="#28303F"/>
              </svg>
          </div>
         </div>
         <div class="h-auto">
            <textarea id="tweetInput" placeholder="What's happening?" class="p-3 bg-transparent text-lg h-auto w-full text-gray-300 outline-none resize-none overflow-hidden"></textarea>
            <!-- Absolute SVG icon -->
            <div id="icon-tweet" class="absolute right-1 bottom-4 transform -translate-y-1/2 opacity-100 transition-opacity duration-300">
               <svg width="24" height="24" class="h-6 w-6 left-0 cursor-pointer animate-opacity" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                 <path fill-rule="evenodd" clip-rule="evenodd" d="M21.9813 4.0651C22.151 2.85824 21.141 1.849 19.9342 2.0187C13.0461 2.98731 7.59633 8.43705 6.62773 15.3252C6.5831 15.6426 6.62001 15.9464 6.72061 16.2186C6.72061 16.2186 6.72061 16.2187 6.72062 16.2187L1.46967 21.4696C1.17678 21.7625 1.17678 22.2374 1.46967 22.5303C1.76256 22.8231 2.23744 22.8231 2.53033 22.5303L7.78115 17.2794C8.05326 17.38 8.35686 17.4169 8.67411 17.3723C11.2473 17.0106 13.6198 16.0235 15.6329 14.5697C16.0381 14.2771 16.262 13.8 16.262 13.3002C16.262 12.3905 16.9995 11.653 17.9092 11.653C18.409 11.653 18.8861 11.4291 19.1787 11.0239C20.6325 9.01079 21.6196 6.6383 21.9813 4.0651ZM6.72062 16.2187C6.902 16.7095 7.29037 17.098 7.78115 17.2794V17.2794L12.5976 12.4629C12.8905 12.1701 12.8905 11.6952 12.5976 11.4023C12.3047 11.1094 11.8299 11.1094 11.537 11.4023L6.72062 16.2187Z" fill="#4D85F1"/>
               </svg>
            </div>
            <p id="charCount" class="absolute right-4 bottom-5 text-lg mr-2 text-gray-500">0/380</p>
         </div>
      </div>
    </div>
    `;
}
// <textarea id="tweetInput" placeholder="What's happening?" class="pr-7 h-auto min-h-full  w-full bg-[#161617] px-1 py-2 border border-[#343435] text-gray-300 rounded-lg outline-none resize-none overflow-hidden"></textarea>
