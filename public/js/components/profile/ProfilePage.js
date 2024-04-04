import { navUserIcon } from "./nav/nav_profile.js";

export function ProfilePage() {
  return `
    <div class="w-full h-full grid grid-cols-profile ">
        <div class="bg-green-700"></div>
        ${navUserIcon()}
    </div>
  `;
}
