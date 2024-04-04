import { Icon } from "../tweet/Icon.js";

export function ProfilePage() {
  return `
    <div class="w-full h-full grid grid-cols-profile ">
        <div class="bg-green-700"></div>
        <div class="nav__profile-user bg-blue-400 flex first-letter:justify-start flex-col items-center [&>*]:my-4 [&>*]:flex-col ">
            ${Icon({src:'profile_nav/Analyze.svg',sizeText:'text-xs mavis',classNameContent:'absolute -bottom-3',styleIcon:"w-8 h-8",alt:"Analyze", content:'Analyze', display:"block", className:"flex justify-center items-center flex-col cursor-pointer "})}
            ${Icon({src:'profile_nav/EditProfile.svg',sizeText:'text-xs mavis',classNameContent:'absolute -bottom-3',styleIcon:"w-8 h-8",alt:"EditProfile", content:'EditProfile', display:"block", className:"flex justify-center items-center flex-col cursor-pointer "})}
            ${Icon({src:'profile_nav/Friends.svg',sizeText:'text-xs mavis',classNameContent:'absolute -bottom-3',styleIcon:"w-8 h-8",alt:"Friends", content:'Friends', display:"block", className:"flex justify-center items-center flex-col cursor-pointer "})}
            ${Icon({src:'profile_nav/DeleteAccount.svg',sizeText:'text-xs mavis',classNameContent:'absolute -bottom-3',styleIcon:"w-8 h-8",alt:"DeleteAccount", content:'DeleteAccount', display:"block", className:"flex justify-center items-center flex-col cursor-pointer "})}
        </div>
    </div>
  `;
}
