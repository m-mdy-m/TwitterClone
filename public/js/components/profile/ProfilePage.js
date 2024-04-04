import { Icon } from "../tweet/Icon.js";

export function ProfilePage() {
  return `
    <div class="w-full h-full grid grid-cols-profile ">
        <div class="bg-green-700"></div>
        <div class="bg-blue-400 flex first-letter:justify-start flex-col items-center [&>*]:my-2 [&>*]:flex-col ">
            ${Icon({src:'profile_nav/Analyze.svg',alt:"Analyze", content:'Analyze', display:"block", className:"flex justify-center items-center flex-col"})}
            ${Icon({src:'profile_nav/EditProfile.svg',alt:"EditProfile", content:'EditProfile', display:"block", className:"flex justify-center items-center flex-col"})}
            ${Icon({src:'profile_nav/Friends.svg',alt:"Friends", content:'Friends', display:"block", className:"flex justify-center items-center flex-col"})}
            ${Icon({src:'profile_nav/DeleteAccount.svg',alt:"DeleteAccount", content:'DeleteAccount', display:"block", className:"flex justify-center items-center flex-col"})}
        </div>
    </div>
  `;
}
