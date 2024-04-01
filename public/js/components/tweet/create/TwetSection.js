import { WrapperIcon } from "./WrapperIcon.js";
import { ButtonCreate } from "./button.js";

export function TweetSection(){
    return `<div class="w-full h-full flex justify-between items-center">
    <!-- Wrapper Icons  -->
    <div class="flex justify-start items-center [&>*]:cursor-pointer px-4">
    ${WrapperIcon()}
    </div>
    <!-- Wrapper Button Tweet -->
    ${ButtonCreate()}
  </div>`
}