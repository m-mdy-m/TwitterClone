export function boxTweet() {
  return `
    <div class="bg-[#1B2430] w-3/6 h-auto min-h-40 z-50 fixed rounded-lg shadow-lg shadow-[#31363F]" id="tweet__box">
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
            <textarea id="tweetInput" placeholder="What's happening?" class="p-3 bg-transparent text-lg h-auto w-full text-gray-300 outline-none resize-none overflow-y-hidden"></textarea>
            <p id="charCount" class="absolute right-4 bottom-5 text-lg mr-2 text-gray-500">0/380</p>
         </div>
      </div>
    </div>
    `;
}
// <textarea id="tweetInput" placeholder="What's happening?" class="pr-7 h-auto min-h-full  w-full bg-[#161617] px-1 py-2 border border-[#343435] text-gray-300 rounded-lg outline-none resize-none overflow-hidden"></textarea>
