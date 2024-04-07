import { Icon } from "../../tweet/Icon.js";

export function navUserIcon(){
    return `
    <div class="nav__profile-user  flex first-letter:justify-start flex-col items-center [&>*]:my-4 [&>*]:flex-col ">
      ${Icon({src:'profile_nav/Analyze.svg',dataPage:"data-page='analyze'",sizeText:'text-xs mavis text-white',classNameContent:'absolute -bottom-3',styleIcon:"w-8 h-8",alt:"Analyze", content:'Analyze', className:"bg-gray-500 rounded-full p-2 flex justify-center items-center flex-col cursor-pointer "})}
      ${Icon({src:'profile_nav/EditProfile.svg',dataPage:"data-page='edit'",sizeText:'text-xs mavis text-white',classNameContent:'absolute -bottom-3',styleIcon:"w-8 h-8",alt:"EditProfile", content:'EditProfile', className:"bg-gray-500  rounded-full p-2 flex justify-center items-center flex-col cursor-pointer "})}
      ${Icon({src:'profile_nav/Friends.svg',dataPage:"data-page='friends'",sizeText:'text-xs mavis text-white',classNameContent:'absolute -bottom-3',styleIcon:"w-8 h-8",alt:"Friends", content:'Friends', className:"bg-gray-500 rounded-full p-2 flex justify-center items-center flex-col cursor-pointer "})}
      ${Icon({src:'profile_nav/DeleteAccount.svg',dataPage:"data-page='deleteAccount'",sizeText:'text-xs mavis text-white',classNameContent:'absolute -bottom-3',styleIcon:"w-8 h-8",alt:"DeleteAccount", content:'DeleteAccount', className:"bg-gray-500 rounded-full p-2 flex justify-center items-center flex-col cursor-pointer "})}
    </div>
    `
}