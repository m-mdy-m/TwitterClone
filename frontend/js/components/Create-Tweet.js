import { UpSection } from "./tweet/create/UpSection";

export function CreateTweet({username,profile}){
    return `<!-- up tweet section -->
    <div class="grid grid-cols-tweet py-2">
      ${UpSection({username,profile})}
    </div>
    <!-- tweet section -->
    <div class="w-full h-full flex justify-between items-center">
      <!-- Wrapper Icons  -->
      <div class="flex justify-start items-center [&>*]:cursor-pointer px-4">
      
      </div>
      <!-- Wrapper Button Tweet -->
      <div id="tweetButton" class="flex justify-center items-center">
        <button type="button" class="px-3 py-1 rounded-lg text-white font-Aktiv__light  bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 transition-all duration-150 ease-in-out  transform hover:scale-105 shadow-md focus:outline-none">
          Tweet
        </button>
      </div>
    </div>`
}