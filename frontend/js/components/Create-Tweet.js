import { UpSection } from "./tweet/create/UpSection.js";
import { WrapperIcon } from "./tweet/create/WrapperIcon.js";
import { ButtonCreate } from "./tweet/create/button.js";

export function CreateTweet({username,profile}){
    return `<!-- up tweet section -->
    <div class="grid grid-cols-tweet py-2">
      ${UpSection({username,profile})}
    </div>
    <!-- tweet section -->
    <div class="w-full h-full flex justify-between items-center">
      <!-- Wrapper Icons  -->
      <div class="flex justify-start items-center [&>*]:cursor-pointer px-4">
      ${WrapperIcon()}
      </div>
      <!-- Wrapper Button Tweet -->
      ${ButtonCreate()}
    </div>`
}